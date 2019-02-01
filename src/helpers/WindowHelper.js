window.TN = window.TN || {}

export const setGlobalVariable = (key, value) => {
    window.TN[key] = value
}

export const getGlobalVariable = (key) => window.TN[key] || {}
