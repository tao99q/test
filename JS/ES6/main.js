/**
 * Created by Yancy on 2017/8/7.
 */
import {firstName, lastName, year} from './profile'

function getName() {
    // element.textContent = firstName + ' ' + lastName;
    console.log(firstName + ' ' + lastName);
}
getName();
import { area, circumference } from './circle';


console.log('圆面积：' + area(4));
console.log('圆周长：' + circumference(14));