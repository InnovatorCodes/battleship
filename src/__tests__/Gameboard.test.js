import GameBoard from "../factories/Gameboard";
import { describe, test, expect, beforeEach } from "@jest/globals";

describe("Testing placeShip function", () => {
  let player1;
  beforeEach(() => {
    player1 = GameBoard();
  });
  test("Testing placing different ships", () => {
    expect(player1.placeShip("carrier", [0, 0], 0)).toBe(true);
    expect(player1.getFleet()[4]).toBeTruthy();

    expect(player1.placeShip("cruiser", [1, 1], 0)).toBe(true);
    expect(player1.getFleet()[2]).toBeTruthy();

    expect(player1.placeShip("destroyer", [5, 5], 1)).toBe(true);
    expect(player1.getFleet()[0]).toBeTruthy();
  });
  test("Placing ship on edge of the board", () => {
    expect(player1.placeShip("carrier", [4, 9], 1)).toBe(true);
    expect(player1.placeShip("battleship", [9, 4], 1)).toBe(false);
  });
  test("Testing placing a ship outside board bounds", () => {
    expect(player1.placeShip("submarine", [-1, 0])).toBe(false);
    expect(player1.placeShip("submarine", [8, 5])).toBe(false);
  });
  test("Testing placing an already placed ship", () => {
    player1.placeShip("battleship", [1, 2], 0);
    expect(player1.placeShip("battleship", [0, 0], 1)).toBe(false);
  });
  test("Testing placing a ship on an occupied position", () => {
    player1.placeShip("battleship", [4, 5], 1);
    expect(player1.placeShip("cruiser", [5, 5], 0)).toBe(false);
    expect(
      player1.getBoard()[5].filter((value) => value.ship == null).length,
    ).toBe(9);
  });
});

describe("Testing recieveAttack function", () => {
  let player1;
  beforeEach(() => {
    player1 = GameBoard();
    player1.placeShip("carrier", [5, 5], 0);
    player1.placeShip("destroyer", [3, 4], 0);
    player1.placeShip("cruiser", [6, 3], 0);
    player1.placeShip("battleship", [0, 6], 0);
    player1.placeShip("submarine", [2, 2], 0);
  });
  test("Hit ship 3 times", () => {
    player1.receiveAttack([5, 6]);
    player1.receiveAttack([5, 7]);
    player1.receiveAttack([5, 8]);
    expect(player1.getShipHits()[4]).toBe(3);
  });
  test("Hit ship twice and miss once", () => {
    player1.receiveAttack([6, 4]);
    player1.receiveAttack([6, 5]);
    player1.receiveAttack([6, 6]);
    expect(player1.getShipHits()[2]).toBe(2);
  });
  test("Repeat attack on same position", () => {
    player1.receiveAttack([0, 7]);
    player1.receiveAttack([0, 7]);
    expect(player1.getShipHits()[3]).toBe(1);
  });
  test("Repeat attack on empty square", () => {
    expect(player1.receiveAttack([0, 0])).toBe(-1);
    expect(player1.receiveAttack([0, 0])).toBe(0);
  });
  test("Attack all 5 ships once each", () => {
    expect(player1.receiveAttack([5, 9])).toBe(1);
    expect(player1.receiveAttack([3, 5])).toBe(1);
    expect(player1.receiveAttack([6, 4])).toBe(1);
    expect(player1.receiveAttack([0, 6])).toBe(1);
    expect(player1.receiveAttack([2, 4])).toBe(1);
    expect(player1.getShipHits().reduce((total, val) => total + val, 0)).toBe(
      5,
    );
  });
  test("Attacking without placing all ships", () => {
    player1 = GameBoard();
    player1.placeShip("cruiser", [6, 3], 0);
    player1.receiveAttack([6, 3]);
    expect(player1.getShipHits()[2]).toBe(0);
  });
});

describe("Testing allSunk function", () => {
  let player1;
  beforeEach(() => {
    player1 = GameBoard();
    player1.placeShip("carrier", [0, 0], 0);
    player1.placeShip("battleship", [1, 0], 0);
    player1.placeShip("cruiser", [2, 0], 0);
    player1.placeShip("submarine", [3, 0], 0);
    player1.placeShip("destroyer", [4, 0], 0);
  });
  test("Sinking all ships and using allSunk function", () => {
    for (let i = 0; i < 5; i++) player1.receiveAttack([0, i]);
    for (let i = 0; i < 4; i++) player1.receiveAttack([1, i]);
    for (let i = 0; i < 3; i++) player1.receiveAttack([2, i]);
    for (let i = 0; i < 3; i++) player1.receiveAttack([3, i]);
    for (let i = 0; i < 2; i++) player1.receiveAttack([4, i]);
    expect(player1.allSunk()).toBe(true);
  });
  test("Sinking all ships but one and using allSunk function", () => {
    for (let i = 0; i < 5; i++) player1.receiveAttack([0, i]);
    for (let i = 0; i < 3; i++) player1.receiveAttack([1, i]);
    for (let i = 0; i < 3; i++) player1.receiveAttack([2, i]);
    for (let i = 0; i < 3; i++) player1.receiveAttack([3, i]);
    for (let i = 0; i < 2; i++) player1.receiveAttack([4, i]);
    expect(player1.allSunk()).toBe(false);
  });
  test("Sinking no ships and using allSunk function", () => {
    expect(player1.allSunk()).toBe(false);
  });
});

describe("Testing getShipName function", () => {
  let player1;
  beforeEach(() => {
    player1 = GameBoard();
    player1.placeShip("carrier", [0, 0], 0);
    player1.placeShip("battleship", [1, 0], 0);
    player1.placeShip("cruiser", [2, 0], 0);
    player1.placeShip("submarine", [3, 0], 0);
    player1.placeShip("destroyer", [4, 0], 0);
  });
  test("", () => {
    expect(player1.getShipName([0, 3])).toBe("carrier");
  });
});
