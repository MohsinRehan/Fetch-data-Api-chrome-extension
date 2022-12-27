

// addEventListener('click', () => changeText())



async function fetchData() {

    window.setTimeout(fetchData, 5000);

    let url = 'http://localhost:3000/dataArray'

    let res = await fetch(url);
    let data = await res.json()
    return data

};



function changeText() {

    let params = {
        active: true,
        currentWindow: true,
    };

    chrome.tabs.query(params, gotTab)

    async function gotTab(tabs) {

        let msg = {
            fetchArray: await fetchData(),
            reptxt: "I Am Extension",
        }

        chrome.runtime.onMessage.addListener(gotMessage);

        function gotMessage(message, sender, sendResponse) {
            console.log(message.sndRequest);


            if (message.sndRequest === "true") {
                chrome.tabs.sendMessage(tabs[0].id, msg)


            }
        }


    }


}
changeText();





