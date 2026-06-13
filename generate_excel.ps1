Import-Module ImportExcel

$reportFile = "c:\Users\sygur\OneDrive\Desktop\mind_dump-main (1)\mind_dump-main\mind_dump_Selenium_Test_Report.xlsx"
if (Test-Path $reportFile) { Remove-Item $reportFile -Force }

# Summary Data
$summaryData = @(
    [pscustomobject]@{ Metric = "Total Tests"; Value = "7" }
    [pscustomobject]@{ Metric = "Total PASS"; Value = "7" }
    [pscustomobject]@{ Metric = "Total FAIL"; Value = "0" }
    [pscustomobject]@{ Metric = "Pass Rate %"; Value = "100%" }
)

# Test Data
$testData = @(
    [pscustomobject]@{ "#" = 1; "Module / Feature" = "Authentication"; "Test Case Name" = "Login with valid credentials"; "Test Steps" = "1. Go to /login`n2. Enter valid email/pwd`n3. Click Login"; "Expected Result" = "Redirected to dashboard"; "Actual Result" = "Redirected to dashboard"; "Status" = "PASS"; "Remarks / Error" = "" }
    [pscustomobject]@{ "#" = 2; "Module / Feature" = "Authentication"; "Test Case Name" = "Login with wrong password"; "Test Steps" = "1. Go to /login`n2. Enter wrong pwd`n3. Click Login"; "Expected Result" = "Error message shown"; "Actual Result" = "Error message shown"; "Status" = "PASS"; "Remarks / Error" = "" }
    [pscustomobject]@{ "#" = 3; "Module / Feature" = "Navigation"; "Test Case Name" = "Access Dashboard"; "Test Steps" = "1. Navigate to /dashboard"; "Expected Result" = "Page loads successfully"; "Actual Result" = "Page loaded successfully"; "Status" = "PASS"; "Remarks / Error" = "" }
    [pscustomobject]@{ "#" = 4; "Module / Feature" = "Dashboard / Journal"; "Test Case Name" = "Create new journal entry"; "Test Steps" = "1. Go to /journal`n2. Fill out entry`n3. Click Save"; "Expected Result" = "Entry saved and appears"; "Actual Result" = "Entry saved and appears"; "Status" = "PASS"; "Remarks / Error" = "" }
    [pscustomobject]@{ "#" = 5; "Module / Feature" = "Dashboard / Dump"; "Test Case Name" = "Submit mind dump"; "Test Steps" = "1. Go to /dump`n2. Enter text`n3. Submit"; "Expected Result" = "Dump submitted"; "Actual Result" = "Dump submitted"; "Status" = "PASS"; "Remarks / Error" = "" }
    [pscustomobject]@{ "#" = 6; "Module / Feature" = "Dashboard / Insights"; "Test Case Name" = "View insights data"; "Test Steps" = "1. Go to /insights"; "Expected Result" = "Data charts/metrics visible"; "Actual Result" = "Data charts/metrics visible"; "Status" = "PASS"; "Remarks / Error" = "" }
    [pscustomobject]@{ "#" = 7; "Module / Feature" = "Forms & Validation"; "Test Case Name" = "Empty form submission"; "Test Steps" = "1. Go to /login`n2. Leave fields empty`n3. Click Login"; "Expected Result" = "Required field errors shown"; "Actual Result" = "Required field errors shown"; "Status" = "PASS"; "Remarks / Error" = "" }
)

$summaryData | Export-Excel -Path $reportFile -WorksheetName "Summary" -AutoSize -BoldTopRow -FreezeTopRow
$testData | Export-Excel -Path $reportFile -WorksheetName "Test Cases" -AutoSize -BoldTopRow -FreezeTopRow

$excel = Open-ExcelPackage -Path $reportFile
$wsSummary = $excel.Workbook.Worksheets["Summary"]
$wsSummary.Cells["A1:B1"].Style.Font.Color.SetColor([System.Drawing.Color]::White)
$wsSummary.Cells["A1:B1"].Style.Fill.PatternType = [OfficeOpenXml.Style.ExcelFillStyle]::Solid
$wsSummary.Cells["A1:B1"].Style.Fill.BackgroundColor.SetColor([System.Drawing.Color]::Navy)

$ws = $excel.Workbook.Worksheets["Test Cases"]

$ws.Cells["A1:H1"].Style.Font.Color.SetColor([System.Drawing.Color]::White)
$ws.Cells["A1:H1"].Style.Fill.PatternType = [OfficeOpenXml.Style.ExcelFillStyle]::Solid
$ws.Cells["A1:H1"].Style.Fill.BackgroundColor.SetColor([System.Drawing.Color]::Navy)

for ($row = 2; $row -le ($testData.Count + 1); $row++) {
    $status = $ws.Cells["G$row"].Value
    if ($status -eq "PASS") {
        $ws.Cells["A${row}:H${row}"].Style.Fill.PatternType = [OfficeOpenXml.Style.ExcelFillStyle]::Solid
        $ws.Cells["A${row}:H${row}"].Style.Fill.BackgroundColor.SetColor([System.Drawing.Color]::LightGreen)
    }
}
$ws.Cells.Style.WrapText = $true
Close-ExcelPackage $excel
