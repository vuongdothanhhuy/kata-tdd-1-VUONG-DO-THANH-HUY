# kata-tdd-1-VUONG-DO-THANH-HUY
Apiumtech Interview

---

kata http://osherove.com/tdd-kata-1

---

The `master` branch is used for init and merge only. Developments are done in subsequent branches such as `dev`.

This program is written with Node, so let's having Node (and npm) installed.

Run `npm install` at this path level to install dependencies. Run `npm install -g mocha` to install Mocha unit testing engine used by one of the Grunt plugins.

Run `grunt` to watch changes on Gruntfile.js and index.js and test.js, on change will auto trigger jshint and mocha test.



I've finished the kata calculator. It's written in NodeJS, being under unit test with Mocha. The code apply some practices and design patterns I think appropriate. I try to keep everything as simple as possible and not to introduce too many complexities into it.



### How to run?

* Clone the repo
* `cd` to the dir where `package.json` locate and run `npm install`
* Install Mocha and Grunt globally: `sudo npm install -g mocha grunt-cli`
* Run `grunt` to run jshint, mocha and auto watch changes.