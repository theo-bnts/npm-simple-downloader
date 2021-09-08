# simple-downloader package

## Installation
```
nmp i simple-downloader
```

## Usage

```js
const { download } = require('simple-downloader')
// OR
import { download } from 'simple-downloader'

await download (
  ['https://speed.hetzner.de/100MB.bin'],     // URLs of the files to download (optional, default: [])
  './downloads',                              // directory path to save the files (optional, default: 'simple-downloader')
  5000,                                       // cooldown between each download (optional, default: 5000)
  true                                        // debug mode (optional, default: false)
)
```
\
That's all you need to know to use this package!
