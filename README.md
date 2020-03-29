# Check Certificates

> Check Certificates using GitHub action and ouput to gist

[Result](https://gist.github.com/fengkx/32278de43b1c11c99c62b3e87d9eb5db)

[Configure example](https://github.com/fengkx/cert-check/blob/master/.github/workflows/check.yml)

Since the `gist.githubusercontent.com` has CORS headers, we can make a status page using this JSON data in gist.

An example is This repository itself contain an `index.html` and `asset` directory 

You can make your own status page once you deploy this action. Just modify the url in [asset/main.js](https://github.com/fengkx/cert-check/blob/master/assets/js/main.js#L6) do the trick. 

Live Demo: [https://cert-check.fengkx.top/](https://cert-check.fengkx.top/)

Inspired by [Himself65/did-zhihu-close-down-today](https://github.com/Himself65/did-zhihu-close-down-today) 
