// Hjälpfunktioner för att få stasradiserade svar från Api:t
function createResponseSuccess(data) {
    return { status: 200, data };
}
function createResponseError(status, message) {
    return {status: status || 500, data: {error: message || "Okänt fel"}}
}
function createResponseMessage(status, message) {
    return {status: status || 200, data: {message: message}}
}

module.exports = {
    createResponseSuccess,
    createResponseError,
    createResponseMessage
}