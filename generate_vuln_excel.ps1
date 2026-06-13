Import-Module ImportExcel

$reportFile = "c:\Users\sygur\OneDrive\Desktop\mind_dump-main (1)\mind_dump-main\mind_dump_Vulnerability_Report.xlsx"
if (Test-Path $reportFile) { Remove-Item $reportFile -Force }

$findingsData = @(
    [pscustomobject]@{ 
        "Severity" = "Critical"; 
        "File Path" = "src/store/useAuthStore.ts (Line 23-32)"; 
        "Vulnerability Type" = "Broken Authentication (Client-side Mocking)"; 
        "Brief Explanation" = "Authentication is entirely mocked on the client. Anyone can open Chrome DevTools, edit localStorage ('minddump-auth'), and set 'isAuthenticated: true' to bypass login."; 
        "Brief Remediation" = "Implement a real backend server (e.g. Node.js) to handle authentication, issue secure HTTPOnly cookies or JWTs, and validate users server-side." 
    }
    [pscustomobject]@{ 
        "Severity" = "Critical"; 
        "File Path" = "src/store/useDumpStore.ts (Line 38-40)"; 
        "Vulnerability Type" = "Sensitive Data Exposure"; 
        "Brief Explanation" = "Highly sensitive user data (journal entries, private thoughts, worries) is stored in plain text in the browser's localStorage. Any XSS vulnerability will allow attackers to steal all this private data."; 
        "Brief Remediation" = "Move data storage to a secure backend database. Do not store sensitive PII or journal entries permanently in the browser's local storage." 
    }
    [pscustomobject]@{ 
        "Severity" = "High"; 
        "File Path" = "src/store/useAuthStore.ts (Line 39-40)"; 
        "Vulnerability Type" = "Insecure Session Management"; 
        "Brief Explanation" = "The session relies on localStorage without any expiration mechanism. The session remains valid forever until the user explicitly clicks logout."; 
        "Brief Remediation" = "Use short-lived JWTs with a secure refresh token mechanism, or server-side sessions with a strict expiry timeout." 
    }
    [pscustomobject]@{ 
        "Severity" = "High"; 
        "File Path" = "src/store/useAuthStore.ts (Line 25, 30)"; 
        "Vulnerability Type" = "Insecure Randomness (Predictable IDs)"; 
        "Brief Explanation" = "User IDs are generated using 'Math.random().toString(36)'. This is a weak, predictable PRNG that can lead to ID collisions and guessing attacks."; 
        "Brief Remediation" = "Use a cryptographically secure library like 'crypto.randomUUID()' or a proper database auto-increment/UUID generator for assigning IDs." 
    }
    [pscustomobject]@{ 
        "Severity" = "Medium"; 
        "File Path" = "src/lib/ai-engine.ts (Line 5)"; 
        "Vulnerability Type" = "Missing Input Sanitization"; 
        "Brief Explanation" = "The application accepts raw user input (thoughts/journals) and processes it directly. If this input is later rendered unsafely in React, it could cause DOM-based XSS."; 
        "Brief Remediation" = "Sanitize all user input using a library like DOMPurify before processing, storing, or rendering it to the screen." 
    }
    [pscustomobject]@{ 
        "Severity" = "Low"; 
        "File Path" = "src/lib/ai-engine.ts (Line 3)"; 
        "Vulnerability Type" = "Denial of Service (DoS) Risk"; 
        "Brief Explanation" = "The mock AI engine relies on a synchronous setTimeout loop to simulate delay, which blocks execution or creates unmanaged promises that could exhaust memory if spammed."; 
        "Brief Remediation" = "Implement rate limiting on the API/Action level so users cannot spam the AI engine endpoint with thousands of requests per second." 
    }
)

$findingsData | Export-Excel -Path $reportFile -WorksheetName "Vulnerabilities" -AutoSize -BoldTopRow -FreezeTopRow

$excel = Open-ExcelPackage -Path $reportFile
$ws = $excel.Workbook.Worksheets["Vulnerabilities"]

# Format Header
$ws.Cells["A1:E1"].Style.Font.Color.SetColor([System.Drawing.Color]::White)
$ws.Cells["A1:E1"].Style.Fill.PatternType = [OfficeOpenXml.Style.ExcelFillStyle]::Solid
$ws.Cells["A1:E1"].Style.Fill.BackgroundColor.SetColor([System.Drawing.Color]::Navy)

# Format Rows and Colors
for ($row = 2; $row -le ($findingsData.Count + 1); $row++) {
    $severity = $ws.Cells["A$row"].Value
    $ws.Cells["A${row}:E${row}"].Style.Fill.PatternType = [OfficeOpenXml.Style.ExcelFillStyle]::Solid
    
    if ($severity -eq "Critical") {
        # Red
        $ws.Cells["A${row}:E${row}"].Style.Fill.BackgroundColor.SetColor([System.Drawing.ColorTranslator]::FromHtml("#FFC7CE"))
    } elseif ($severity -eq "High") {
        # Orange
        $ws.Cells["A${row}:E${row}"].Style.Fill.BackgroundColor.SetColor([System.Drawing.ColorTranslator]::FromHtml("#FFEB9C"))
    } elseif ($severity -eq "Medium") {
        # Yellow
        $ws.Cells["A${row}:E${row}"].Style.Fill.BackgroundColor.SetColor([System.Drawing.Color]::Yellow)
    } elseif ($severity -eq "Low") {
        # Green
        $ws.Cells["A${row}:E${row}"].Style.Fill.BackgroundColor.SetColor([System.Drawing.ColorTranslator]::FromHtml("#C6EFCE"))
    }
}

$ws.Cells.Style.WrapText = $true

# Adjust column widths to reasonable sizes so they don't look weird when auto-sized with wrapped text
$ws.Column(4).Width = 50
$ws.Column(5).Width = 50

Close-ExcelPackage $excel
