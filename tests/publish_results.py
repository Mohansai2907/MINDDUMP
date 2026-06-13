import os
import openpyxl

def get_summary_val(summary, keys, default='N/A'):
    if not isinstance(keys, list):
        keys = [keys]
    for k in keys:
        if k in summary and summary[k] is not None:
            return summary[k]
        for sk in summary.keys():
            if str(sk).strip().lower() == str(k).strip().lower():
                return summary[sk]
    return default

def get_detail_val(row, keys, default='N/A'):
    if not isinstance(keys, list):
        keys = [keys]
    for k in keys:
        if k in row and row[k] is not None:
            return row[k]
        for rk in row.keys():
            if str(rk).strip().lower() == str(k).strip().lower():
                return row[rk]
    return default

def format_pass_rate(val):
    if val is None:
        return 'N/A'
    val_str = str(val).strip()
    if val_str.endswith('%'):
        return val_str
    try:
        # Check if float or int and format as percentage
        float_val = float(val_str.replace('%', ''))
        return f"{float_val}%"
    except ValueError:
        return val_str

def parse_report(filepath, is_security=False):
    wb = openpyxl.load_workbook(filepath, data_only=True)
    sheet_names = wb.sheetnames
    
    # Identify Summary Sheet
    summary_dict = {}
    ws_summary = None
    if 'Summary' in sheet_names:
        ws_summary = wb['Summary']
    elif 'summary' in [s.lower() for s in sheet_names]:
        ws_summary = wb[next(s for s in sheet_names if s.lower() == 'summary')]
        
    # Identify Details Sheet
    ws_details = None
    details_candidates = ['Test Details', 'Test Cases', 'Vulnerabilities', 'test details', 'test cases', 'vulnerabilities']
    for candidate in details_candidates:
        if candidate in sheet_names:
            ws_details = wb[candidate]
            break
    
    if ws_details is None:
        # Fallback to look for case-insensitive substrings
        for candidate in details_candidates:
            matching = [s for s in sheet_names if candidate.lower() in s.lower()]
            if matching:
                ws_details = wb[matching[0]]
                break
                
    if ws_details is None:
        # Fallback to the first sheet that isn't summary
        non_summary_sheets = [s for s in sheet_names if 'summary' not in s.lower()]
        if non_summary_sheets:
            ws_details = wb[non_summary_sheets[0]]
        else:
            ws_details = wb[sheet_names[0]]
            
    # Parse Details
    detail_rows = list(ws_details.values)
    details = []
    if detail_rows:
        detail_headers = [str(h) if h is not None else f"Col{i}" for i, h in enumerate(detail_rows[0])]
        for r in detail_rows[1:]:
            if r and r[0] is not None:
                details.append(dict(zip(detail_headers, r)))
                
    # Parse Summary
    if ws_summary is not None:
        rows = list(ws_summary.values)
        if rows:
            first_row = rows[0]
            # Check if it is vertical key-value (like Metric, Value) or horizontal (headers in row 1, data in row 2)
            if len(first_row) == 2 and str(first_row[0]).lower() in ['metric', 'key'] and str(first_row[1]).lower() in ['value', 'val']:
                # Vertical format
                for r in rows[1:]:
                    if r and len(r) >= 2 and r[0] is not None:
                        summary_dict[str(r[0])] = r[1]
            else:
                # Horizontal format
                headers = [str(h) for h in rows[0]]
                data = rows[1] if len(rows) > 1 else [None]*len(headers)
                summary_dict = dict(zip(headers, data))
    else:
        # Auto-generate summary from details if missing
        total_tests = len(details)
        if is_security:
            # Count by severity
            critical = sum(1 for d in details if str(get_detail_val(d, 'Severity')).lower() == 'critical')
            high = sum(1 for d in details if str(get_detail_val(d, 'Severity')).lower() == 'high')
            medium = sum(1 for d in details if str(get_detail_val(d, 'Severity')).lower() == 'medium')
            low = sum(1 for d in details if str(get_detail_val(d, 'Severity')).lower() == 'low')
            failed = critical + high
            passed = total_tests - failed
            pass_rate = (passed / total_tests * 100) if total_tests > 0 else 100.0
            
            summary_dict = {
                'Test Suite': 'Backend Security Verification',
                'Total Tests': total_tests,
                'Passed': passed,
                'Failed': failed,
                'Pass Rate %': f"{pass_rate:.1f}%",
                'Duration (sec)': 'N/A',
                'End Time': 'N/A',
                'Critical': critical,
                'High': high,
                'Medium': medium,
                'Low': low
            }
        else:
            # Check status column
            passed = 0
            failed = 0
            for d in details:
                st = str(get_detail_val(d, ['Status', 'Result'])).lower()
                if 'pass' in st or st == 'ok' or st == 'true':
                    passed += 1
                else:
                    failed += 1
            pass_rate = (passed / total_tests * 100) if total_tests > 0 else 100.0
            
            summary_dict = {
                'Test Suite': 'E2E Test Suite',
                'Total Tests': total_tests,
                'Passed': passed,
                'Failed': failed,
                'Pass Rate %': f"{pass_rate:.1f}%",
                'Duration (sec)': 'N/A',
                'End Time': 'N/A'
            }
            
    return summary_dict, details

def main():
    import sys
    if hasattr(sys.stdout, 'reconfigure'):
        sys.stdout.reconfigure(encoding='utf-8', errors='replace')

    tests_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Locate files in tests/reports/
    reports_dir = os.path.join(tests_dir, "reports")
    e2e_file = None
    sec_file = None
    
    if os.path.exists(reports_dir):
        for f in os.listdir(reports_dir):
            if f.startswith("E2E_Test_Report_Glowtics_") and f.endswith(".xlsx"):
                e2e_file = f
            elif f.startswith("Vulnerability_Test_Report_Glowtics_") and f.endswith(".xlsx"):
                sec_file = f
                
    # Fallbacks if files with specific names aren't found
    e2e_path = os.path.join(reports_dir, e2e_file if e2e_file else "E2E_Test_Report_Glowtics_2026-06-11T07-22-21.xlsx")
    sec_path = os.path.join(reports_dir, sec_file if sec_file else "Vulnerability_Test_Report_Glowtics_2026-06-12T05-45-33.xlsx")
    
    if not os.path.exists(e2e_path) or not os.path.exists(sec_path):
        print(f"Error: Required test reports not found in {reports_dir}")
        print(f"E2E report path: {e2e_path} (Exists: {os.path.exists(e2e_path)})")
        print(f"Security report path: {sec_path} (Exists: {os.path.exists(sec_path)})")
        sys.exit(1)
        
    e2e_summary, e2e_details = parse_report(e2e_path, is_security=False)
    sec_summary, sec_details = parse_report(sec_path, is_security=True)
    
    markdown_output = []
    markdown_output.append("# 🧪 Glowtics Automated Test Verification Dashboard\n")
    markdown_output.append("This dashboard displays the test results verified from the completed test execution reports.\n")
    
    # E2E Test Suite Summary
    markdown_output.append("## 🌿 E2E Test Suite Summary")
    markdown_output.append("| Metric | Value |")
    markdown_output.append("|---|---|")
    markdown_output.append(f"| **Test Suite** | {get_summary_val(e2e_summary, ['Test Suite'], 'Glowtics E2E Tests')} |")
    markdown_output.append(f"| **Total Test Cases** | {get_summary_val(e2e_summary, ['Total Tests', 'Total Test Cases'])} |")
    markdown_output.append(f"| **Passed** | ✅ {get_summary_val(e2e_summary, ['Passed', 'Total PASS'])} |")
    markdown_output.append(f"| **Failed** | ❌ {get_summary_val(e2e_summary, ['Failed', 'Total FAIL'])} |")
    markdown_output.append(f"| **Pass Rate** | **{format_pass_rate(get_summary_val(e2e_summary, ['Pass Rate %', 'Pass Percentage']))}** |")
    markdown_output.append(f"| **Duration** | {get_summary_val(e2e_summary, ['Duration (sec)', 'Execution Time'])} |")
    markdown_output.append(f"| **Timestamp** | {get_summary_val(e2e_summary, ['End Time', 'Execution Date'])} |")
    markdown_output.append("\n")
    
    # Security Vulnerability Summary
    markdown_output.append("## 🛡️ Backend Security Verification Summary")
    markdown_output.append("| Metric | Value |")
    markdown_output.append("|---|---|")
    markdown_output.append(f"| **Test Suite** | {get_summary_val(sec_summary, ['Test Suite'], 'Backend Security Verification')} |")
    markdown_output.append(f"| **Total Findings** | {get_summary_val(sec_summary, ['Total Tests', 'Total Test Cases'])} |")
    
    # If we have severity counts, show them
    critical = get_summary_val(sec_summary, 'Critical', None)
    if critical is not None:
        markdown_output.append(f"| **Critical Severity 🚨** | {critical} |")
        markdown_output.append(f"| **High Severity 🟠** | {get_summary_val(sec_summary, 'High')} |")
        markdown_output.append(f"| **Medium Severity 🟡** | {get_summary_val(sec_summary, 'Medium')} |")
        markdown_output.append(f"| **Low Severity 🟢** | {get_summary_val(sec_summary, 'Low')} |")
    else:
        markdown_output.append(f"| **Passed** | ✅ {get_summary_val(sec_summary, ['Passed', 'Total PASS'])} |")
        markdown_output.append(f"| **Failed** | ❌ {get_summary_val(sec_summary, ['Failed', 'Total FAIL'])} |")
        markdown_output.append(f"| **Pass Rate** | **{format_pass_rate(get_summary_val(sec_summary, ['Pass Rate %', 'Pass Percentage']))}** |")
        
    markdown_output.append(f"| **Duration** | {get_summary_val(sec_summary, ['Duration (sec)', 'Execution Time'])} |")
    markdown_output.append(f"| **Timestamp** | {get_summary_val(sec_summary, ['End Time', 'Execution Date'])} |")
    markdown_output.append("\n")
    
    # E2E Details Expandable Section
    markdown_output.append("### 📋 E2E Test Cases Detail Breakdowns")
    markdown_output.append(f"<details><summary>Click to view all E2E Test Cases ({len(e2e_details)} tests)</summary>\n")
    markdown_output.append("| No. | Category | Test Name | Status |")
    markdown_output.append("|---|---|---|---|")
    for r in e2e_details:
        no = get_detail_val(r, ['No.', '#', 'Test Case ID'])
        category = get_detail_val(r, ['Category', 'Module / Feature', 'Module'])
        test_name = get_detail_val(r, ['Test Name', 'Test Case Name', 'Test Case'])
        status = str(get_detail_val(r, ['Status', 'Result'])).upper()
        status_emoji = "✅ PASSED" if "PASS" in status or status == "OK" else "❌ FAILED"
        markdown_output.append(f"| {no} | {category} | `{test_name}` | {status_emoji} |")
    markdown_output.append("\n</details>\n")
    
    # Security Details Expandable Section
    markdown_output.append("### 🔐 Security Test Cases Detail Breakdowns")
    markdown_output.append(f"<details><summary>Click to view all Security Findings ({len(sec_details)} items)</summary>\n")
    
    # Detect layout of security details
    if sec_details and 'Severity' in sec_details[0]:
        markdown_output.append("| No. | Severity | Vulnerability Type | File Path | Brief Explanation |")
        markdown_output.append("|---|---|---|---|---|")
        for idx, r in enumerate(sec_details, 1):
            severity = str(get_detail_val(r, 'Severity'))
            sev_emoji = f"🚨 {severity}" if severity.lower() == 'critical' else (f"🟠 {severity}" if severity.lower() == 'high' else (f"🟡 {severity}" if severity.lower() == 'medium' else f"🟢 {severity}"))
            vuln_type = get_detail_val(r, 'Vulnerability Type')
            file_path = get_detail_val(r, 'File Path')
            explanation = get_detail_val(r, 'Brief Explanation')
            markdown_output.append(f"| {idx} | {sev_emoji} | {vuln_type} | `{file_path}` | {explanation} |")
    else:
        markdown_output.append("| No. | Category | Test Name | Status |")
        markdown_output.append("|---|---|---|---|")
        for r in sec_details:
            no = get_detail_val(r, ['No.', '#', 'Test Case ID'])
            category = get_detail_val(r, ['Category', 'Module'])
            test_name = get_detail_val(r, ['Test Name', 'Test Case'])
            status = str(get_detail_val(r, ['Status', 'Result'])).upper()
            status_emoji = "✅ PASSED" if "PASS" in status or status == "OK" else "❌ FAILED"
            markdown_output.append(f"| {no} | {category} | `{test_name}` | {status_emoji} |")
            
    markdown_output.append("\n</details>\n")
    
    markdown_output.append("## 📦 Downloadable Test Report Artifacts")
    markdown_output.append("The full Excel spreadsheets (`.xlsx`) containing detailed worksheets (passed tests, failed tests, execution logs, and tracebacks) are uploaded as artifacts for this workflow run and can be downloaded from the **Artifacts** section at the top of the page.")
    
    full_markdown = "\n".join(markdown_output)
    
    # Write to GITHUB_STEP_SUMMARY
    summary_file = os.environ.get("GITHUB_STEP_SUMMARY")
    if summary_file:
        with open(summary_file, "w", encoding="utf-8") as f:
            f.write(full_markdown)
        print("Successfully published test results to GitHub Step Summary!")
    else:
        print(full_markdown)

if __name__ == "__main__":
    main()
