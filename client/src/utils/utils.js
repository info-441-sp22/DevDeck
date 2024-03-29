
export const escapeHTML = str => !str ? str : str.replace(/[&<>'"]/g,
    tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
    }[tag]));


export async function fetchJSON(route, options) {
    let response
    try {
        response = await fetch(route, {
            credentials: 'include',
            method: options && options.method ? options.method : "GET",
            body: options && options.body ? JSON.stringify(options.body) : undefined,
            headers: options && options.body ? { 'Content-Type': 'application/json' } : undefined
        })
    } catch (error) {
        displayError()
        throw new Error(
            `Error fetching ${route} with options: ${options ? JSON.stringify(options) : options}
             No response from server (failed to fetch)`)
    }
    let responseJson;
    responseJson = await response.json();
    return responseJson;
}

export async function displayError() {
    document.getElementById('errorInfo').innerText = 'Error: action failed (see console for more information)'
    document.getElementById('errorInfo').style.opacity = 1
    // pause 4 seconds
    await new Promise(resolve => setTimeout(resolve, 4 * 1000))
    document.getElementById('errorInfo').innerText = ''
    document.getElementById('errorInfo').style.opacity = 0
}
