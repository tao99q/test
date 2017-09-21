/**
 * Created by Yancy on 2017/8/7.
 */
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;
function multiply(x, y) {
    return x * y;
};
function v1() {
    console.log('v1');
}
function v2() {
    console.log('v2');
}

export {
    firstName,
    lastName,
    year,
    v1 as streamV1,
    v2 as streamV2,
    v2 as streamLatestVersion,
    multiply,
};