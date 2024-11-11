import ship from '../factories/Ship';
import {describe,test,expect, beforeEach} from '@jest/globals';

describe("Testing Hit Function",()=>{
    let testShip
    beforeEach(()=>{
        testShip=new ship("carrier");
    })
    test("hit() used 0 times, hitCount=0",()=>{
        expect(testShip.hitCount()).toBe(0);
    })
    test("hit() used 1 times, hitCount = 1",()=>{
        testShip.hit();
        expect(testShip.hitCount()).toBe(1);
    })
    test("hit() used 5 times, hitCount = 5",()=>{
        testShip.hit()
        testShip.hit()
        testShip.hit()
        testShip.hit()
        testShip.hit();
        expect(testShip.hitCount()).toBe(5);
    })
    test("hit() used 7 times, hitCount = 5",()=>{
        testShip.hit()
        testShip.hit()
        testShip.hit()
        testShip.hit()
        testShip.hit()
        testShip.hit()
        testShip.hit();
        expect(testShip.hitCount()).toBe(5);
    })
})

describe("Testing isSunk Function",()=>{
    let testShip;
    beforeEach(()=>{
        testShip=new ship("carrier");
    })

    test("hit used 0 times, isSunk returns false",()=>{
        expect(testShip.isSunk()).toBe(false);
    })
    test("hit used 1 times, isSunk returns false",()=>{
        testShip.hit();
        expect(testShip.isSunk()).toBe(false);
    })
    test("hit used 5 times, isSunk returns true",()=>{
        testShip.hit();
        testShip.hit();
        testShip.hit();
        testShip.hit();
        testShip.hit();
        expect(testShip.isSunk()).toBe(true);
    })
    test("hit used 7 times, isSunk returns true",()=>{
        testShip.hit();
        testShip.hit();
        testShip.hit();
        testShip.hit();
        testShip.hit();
        testShip.hit();
        testShip.hit();
        expect(testShip.isSunk()).toBe(true);
    })
})