const submit_btn = document.getElementById('export')
const from = document.getElementById('from')
const to = document.getElementById('to')
const per_x_min_value = document.getElementById('per_x_min_value')

const templates = document.getElementsByName('export-template')

const max = new Date().toISOString().split("T")[0]
from.max = max
to.max = max
async function _getToken() {
    for (const key of ['authorization', 'authorization-token']) {
        let cookie = await utils.getCookie('https://app.getsling.com', key)
        if (cookie) {
            return cookie.value
        }
    }
    return null
}


async function _submit(e) {
    e.preventDefault()

    const token = await _getToken()
    if (token === null) {
        alert("Error: No authorization token found, contact CoopCycle developers"); 
        return
    }

    let template_elem;
    for (const template of templates) {
        if (template.checked) {
            template_elem = template
        }
    }
    const from_date = new Date(from.value)
    const to_date = new Date(to.value)
    if (from_date > to_date) {
        alert("Error: 'From' date must be before 'To' date")
        return
    }
    await utils.getExport(token, {
        from: from.value,
        to: to.value,
        template: template_elem.value,
        per_x_min: per_x_min_value.value
    }, "save")

}

document.getElementById('export-form').addEventListener('submit', _submit)
