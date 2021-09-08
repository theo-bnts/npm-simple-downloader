const { existsSync, mkdirSync, writeFileSync } = require('fs')
const { default: axios } = require('axios')

/**
 * Downloading files from URLs
 * @param {string[]} filesURLs URLs of the files to download
 * @param {string} directoryPath directory path to save the files
 * @param {number} cooldown cooldown between each download
 * @param {boolean} debug debug mode
 * @return {Promise<void>} all time null
*/

module.exports.download = async (
    filesURLs = [],
    directoryPath = 'simple-downloader',
    cooldown = 5000,
    debug = false
) => {
    
    if (!existsSync(directoryPath)) {
        mkdirSync(directoryPath)
    }

    for (const url of filesURLs) {

        const request = await axios({
            url: url,
            responseType: 'arraybuffer'
        })

        let fileName
        try {

            const headerLine = request.headers['content-disposition']
            
            const headerLineData = headerLine
                .split(';')
                .map(data => {
                    data = data
                        .trim()
                        .split('=')
                    return new Object({
                        key: data[0],
                        value: data[1]
                    })
                })

            fileName = headerLineData
                .find(data => data.key === 'filename')
                .value

        } catch (e) {

            fileName = url.split('/').pop()

        }

        if (debug)
            console.log(fileName, 'successfully downloaded and saved in', directoryPath)

        await writeFileSync(directoryPath + '/' + fileName, request.data)

        await new Promise((resolve) => setTimeout(resolve, cooldown))
    }
}