const puppeteer = require('puppeteer')
const readline = require('readline-sync')

console.log('Finance Quotation Bot - 🤖💰\n')

async function robot() {
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    const dolarHojeURL = 'https://dolarhoje.com';
    await page.goto(dolarHojeURL);
    await page.screenshot({ path: 'dolar-hoje.png' });
    const secondResult = await page.evaluate(() => {
        return document.querySelector('#nacional').value
    });
    console.log(`O valor da moeda é: USD ${secondResult}\n`)
    
    const firstCoin = readline.question('Moeda Principal: ') || 'dolar'
    const secondCoin = readline.question('Moeda Convertida: ') || 'real'
    const googleURL = `https://www.google.com/search?q=${firstCoin}+para+${secondCoin}&sxsrf=ALeKk03Q2JbrnFIDU6A7-fU3sm6mKBb_AA%3A1625708884539&source=hp&ei=VFnmYJTzHfe55OUP_Z6iuAk&iflsig=AINFCbYAAAAAYOZnZBQZYwHWo4i5IZYRcJ5N8FzVJKzj&oq=${firstCoin}+para+${secondCoin}&gs_lcp=Cgdnd3Mtd2l6EAMyCggAELEDEEYQggIyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAMgIIADICCAA6BAgjECc6BAguECc6CwguELEDEMcBEKMCOggIABCxAxCDAToFCAAQsQM6CAguEMcBEKMCOgUILhCxAzoKCAAQsQMQgwEQCjoJCCMQJxBGEIICOgUIABDJAzoECAAQClCQCFiBGGDHGWgAcAB4AIAB9wKIAfoYkgEHMC4zLjUuNJgBAKABAaoBB2d3cy13aXo&sclient=gws-wiz&ved=0ahUKEwiU7cXErdLxAhX3HLkGHX2PCJcQ4dUDCAc&uact=5`
    await page.goto(googleURL)
    await page.screenshot({ path: 'google.png' });

    const result = await page.evaluate(() => {
        return document.querySelector('.a61j6.vk_gy.vk_sh.Hg3mWc').value
    });

    const main = firstCoin[0].toUpperCase() + firstCoin.substr(1)
    const converted = secondCoin[0].toUpperCase() + secondCoin.substr(1)
    console.log(`\nCotação atual de 1 ${main} ➡️  em ${converted}: ${result}`)
    await browser.close();

    cotAgain()
}

robot();

function cotAgain() {
    const answer = readline.question('Deseja cotar outra moeda? (S/N)\n')
    if (answer === 'S' || answer === 's') {
        robot()
    } else {
        console.log('Bis bald')
    }
}