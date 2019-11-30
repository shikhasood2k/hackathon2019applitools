const assert = require('assert')
describe('Test login page elements', () => {
  it('Login page elements test', () => {
    browser.url('https://demo.applitools.com/hackathon.html')
    const title = browser.getTitle()
    assert.strictEqual(title, 'ACME demo app')
  })
  it('Validate Auth header', () => {
    sTitle = $('.auth-header').getText();
    assert.strictEqual(sTitle, "Login Form");
  });
  it('Validate username label', () => {
    let sLabelName = $('//*[@id="username"]/preceding-sibling::label').getText();
    assert.strictEqual(sLabelName, "Username");
  });
  it('Validate username field', () => {
    let userNamePlace = $('#username').getAttribute("placeholder");
    assert.strictEqual(userNamePlace, "Enter your username");
  });
  it('Validate password label', () => {
    let sLabelPassword = $('//*[@id="password"]/preceding-sibling::label').getText();
    assert.strictEqual(sLabelPassword, "Password");
  });
  it('Validate password field', () => {
    let passwordPlace = $('#password').getAttribute("placeholder");
    assert.strictEqual(passwordPlace, "Enter your password");
  });
  it('Validate Login button', () => {
    let loginButtonText = $('#log-in').getText();
    assert.strictEqual(loginButtonText, "Log In");
  });
  it('Validate Remember Me checkbox', () => {
    let rememberMeText = $('.form-check-label').getText();
    assert.strictEqual(rememberMeText, "Remember Me");
  });
})
describe('Test login functionality', () => {
  it('Validate empty value login', () => {
    $('#log-in').click()
    let txtAlert = $('.alert-warning').getText();
    assert.strictEqual(txtAlert, "Both Username and Password must be present");
  })
  it('Validate empty password login', () => {
    $('#username').setValue("testUser");
    $('#log-in').click();
    let txtAlert = $('.alert-warning').getText();
    assert.strictEqual(txtAlert, "Password must be present");
    $('#username').clearValue();
  });
  it('Validate empty username login', () => {
    $('#password').setValue("testPassword")
    $('#log-in').click()
    let txtAlert = $('.alert-warning').getText();
    assert.strictEqual(txtAlert, "Username must be present")
  });
  it('Validate valid login', () => {
    $('#username').setValue("testUser");
    $('#password').setValue("testPassword")
    $('#log-in').click()
    let titleChart = $('#showExpensesChart').getText();
    assert.strictEqual(titleChart, "Compare Expenses");
  });
});
describe('Table sort Test', () => {
  it('Validate values from Table', ()=> {
    let beforeSort = getJSON('//*[@id=\"transactionsTable\"]/tbody/tr', '<td />');
    $('#amount').click();
    let afterSort = getJSON('//*[@id=\"transactionsTable\"]/tbody/tr', '<td />');
    sortedBefore = beforeSort.sort(function(a,b){
      let aTempVal = a.amount.replace(" USD","").replace(/(^\$|,)/g,"").replace(" ","")
      let bTempVal = b.amount.replace(" USD","").replace(/(^\$|,)/g,"").replace(" ","")
      return aTempVal - bTempVal
    });
    assert.strictEqual(afterSort.toString(), sortedBefore.toString())
  });

});
describe('Canvas Chart Test', () => {
  it('Validate Chart Values for Compare Expenses', function () {
    $('#showExpensesChart').click()
    console.log("Visual Comparison not possible for charts")
    $('#addDataset').click()
    console.log("Visual Comparison not possible for charts");
  });
});
describe('Dynamic Content Test', () => {
  it('Login with ad enabled', () => {
    browser.url('https://demo.applitools.com/hackathon.html?showAd=true');
    let pageTitle = browser.getTitle();
    assert.strictEqual(pageTitle, "ACME demo app");
    $('#username').setValue("testUser");
    $('#password').setValue("testPassword")
    $('#log-in').click()
    let sChartTitle = $('#showExpensesChart').getText();
    assert.strictEqual(sChartTitle, "Compare Expenses")
  });
  it('Validate Flash content 1 for ads', () => {
    let sDisplayed = $('#flashSale').isDisplayed();
    assert.strictEqual(sDisplayed, true);
    console.log("Visual Ad content cannot be validated")
  })
  it('Validate Flash content 2 for ads', () => {
    let sDisplayed = $('#flashSale2').isDisplayed();
    assert.strictEqual(sDisplayed, true);
    console.log("Visual Ad content cannot be validated")
  })
});

function getJSON(sParentPath,sChildTag){
  let sortVar=[];
  const parentElems = $$(sParentPath)
  parentElems.forEach((elem, index) =>{
    let sCellTextValue = {}
    elem.$$(sChildTag).forEach((elemCell, indexCell)=> {
      let text = elemCell.getText();
      switch (indexCell) {
        case 0:
            sCellTextValue["status"] = text.toString();
          break;
        case 1:
            sCellTextValue["date"] = text.toString();
          break;
        case 2:
            sCellTextValue["description"] = text.toString();
          break;
        case 3:
            sCellTextValue["category"] = text.toString();
          break;
        case 4:
            sCellTextValue["amount"] = text.toString();
          break;
      }
    })
      sortVar.push(sCellTextValue)
  })
  return sortVar;
}