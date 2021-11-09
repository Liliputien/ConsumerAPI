import camelCase from "lodash/camelCase";


const requireApi = require.context(
    // Search for files in the current directory
    '.',
    // Search for files in subdirectories
    true,
    // Include any .js files that are not unit tests
    /^((?!\.unit\.).)*\.js/
)

const root = {apis: {}}


requireApi.keys().forEach(fileName => {
    if (fileName === './index.js') return
    // Get the module path as an array
    const apiPath = fileName
        // Remove the "./" from the beginning
        .replace(/^\.\//, '')
        // Remove the file extension from the end
        .replace(/\.\w+$/, '')
        // Split nested modules into an array path
        .split(/\//)
        // camelCase all module namespaces and names
        .map(camelCase)

    const {apis} = getNamespace(root, apiPath)

    // console.log(apis)

    apis[apiPath.pop()] = requireApi(fileName).default

    //
    // Recursively get the namespace of the module, even if nested
    function getNamespace(subtree, path) {
        if (path.length === 1) return subtree

        const namespace = path.shift()
        subtree.apis[namespace] = {apis: {}, ...subtree.apis[namespace]}
        return getNamespace(subtree.apis[namespace], path)
    }
})

export default root.apis