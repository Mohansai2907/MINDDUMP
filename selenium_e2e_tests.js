const { Builder, By, until } = require('selenium-webdriver');
const ExcelJS = require('exceljs');

const URL = 'http://localhost:3000';

async function runTests() {
    let driver = await new Builder().forBrowser('chrome').build();
    let results = [];

    // Helper to add results
    const addResult = (id, module, name, steps, expected, actual, status, remarks = '') => {
        results.push({ id, module, name, steps, expected, actual, status, remarks });
        console.log(`[${status}] ${name}`);
    };

    try {
        // --- 1. Authentication ---
        // Login with valid credentials
        await driver.get(`${URL}/login`);
        await driver.findElement(By.name('email')).sendKeys('testuser@gmail.com');
        await driver.findElement(By.name('password')).sendKeys('Test@1234');
        await driver.findElement(By.css('button[type="submit"]')).click();
        
        try {
            await driver.wait(until.urlContains('/dashboard'), 5000);
            addResult(1, 'Authentication', 'Login with valid credentials', '1. Go to /login\n2. Enter valid email & pwd\n3. Click Login', 'Redirected to dashboard', 'Redirected to dashboard', 'PASS');
        } catch (e) {
            addResult(1, 'Authentication', 'Login with valid credentials', '1. Go to /login\n2. Enter valid email & pwd\n3. Click Login', 'Redirected to dashboard', 'Failed to redirect', 'FAIL', e.message);
        }

        // Login with wrong password
        await driver.get(`${URL}/login`);
        await driver.findElement(By.name('email')).sendKeys('testuser@gmail.com');
        await driver.findElement(By.name('password')).sendKeys('WrongPassword!');
        await driver.findElement(By.css('button[type="submit"]')).click();
        try {
            let errorMsg = await driver.wait(until.elementLocated(By.css('.error-message')), 3000);
            addResult(2, 'Authentication', 'Login with wrong password', '1. Go to /login\n2. Enter wrong pwd\n3. Click Login', 'Error message shown', 'Error message shown', 'PASS');
        } catch (e) {
            addResult(2, 'Authentication', 'Login with wrong password', '1. Go to /login\n2. Enter wrong pwd\n3. Click Login', 'Error message shown', 'No error message found', 'FAIL', 'Missing error UI element');
        }

        // --- 2. Navigation & Core Features ---
        const routes = ['/dashboard', '/journal', '/dump', '/insights', '/analytics', '/profile', '/settings'];
        let routeId = 3;
        for (let route of routes) {
            await driver.get(`${URL}${route}`);
            let title = await driver.getTitle();
            if (title && !title.includes('404')) {
                addResult(routeId++, 'Navigation', `Access ${route} page`, `1. Navigate to ${route}`, 'Page loads successfully', 'Page loaded', 'PASS');
            } else {
                addResult(routeId++, 'Navigation', `Access ${route} page`, `1. Navigate to ${route}`, 'Page loads successfully', 'Page failed to load or 404', 'FAIL');
            }
        }

        // Generate Excel Report
        await generateExcel(results);

    } finally {
        await driver.quit();
    }
}

async function generateExcel(results) {
    const workbook = new ExcelJS.Workbook();
    const summarySheet = workbook.addWorksheet('Summary');
    const testSheet = workbook.addWorksheet('Test Cases');

    // Summary Sheet
    const total = results.length;
    const pass = results.filter(r => r.status === 'PASS').length;
    const fail = total - pass;
    
    summarySheet.columns = [{ header: 'Metric', key: 'metric', width: 20 }, { header: 'Value', key: 'value', width: 20 }];
    summarySheet.addRows([
        { metric: 'Total Tests', value: total },
        { metric: 'Total PASS', value: pass },
        { metric: 'Total FAIL', value: fail },
        { metric: 'Pass Rate %', value: `${((pass / total) * 100).toFixed(2)}%` }
    ]);

    // Test Cases Sheet
    testSheet.columns = [
        { header: '#', key: 'id', width: 5 },
        { header: 'Module / Feature', key: 'module', width: 20 },
        { header: 'Test Case Name', key: 'name', width: 30 },
        { header: 'Test Steps', key: 'steps', width: 45 },
        { header: 'Expected Result', key: 'expected', width: 30 },
        { header: 'Actual Result', key: 'actual', width: 30 },
        { header: 'Status', key: 'status', width: 10 },
        { header: 'Remarks / Error', key: 'remarks', width: 30 }
    ];

    testSheet.addRows(results);

    // Apply formatting required by the assignment
    [summarySheet, testSheet].forEach(sheet => {
        sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
        sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF000080' } }; // Dark Navy
    });

    testSheet.eachRow((row, rowNumber) => {
        row.eachCell(cell => { cell.alignment = { wrapText: true, vertical: 'top' }; });
        if (rowNumber > 1) {
            const status = row.getCell('status').value;
            if (status === 'PASS') row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFC6EFCE' } };
            if (status === 'FAIL') row.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFC7CE' } };
        }
    });

    await workbook.xlsx.writeFile('mind_dump_Selenium_Test_Report.xlsx');
    console.log('✅ mind_dump_Selenium_Test_Report.xlsx has been generated successfully!');
}

runTests();
