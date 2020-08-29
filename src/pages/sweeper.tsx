import React, { Component } from "react";
import "../css/sweeper.css";
import Mine from "@src/components/mine";
import { memorize } from "@src/utils/tools";

const bombsAmount = 20;

function makeArr(index, gap) {
  const arr = [];
  arr.push(...[index + 1, index - 1]);
  arr.push(...[index + 1 + gap, index - 1 + gap]);
  arr.push(...[index + 1 - gap, index - 1 - gap]);
  arr.push(...[index - gap, index + gap]);
  return arr;
}

function generateData(total: number, bombs: number): any[] {
  const bombsArr = Array.from({ length: bombs }, () => 1);
  const normalArr = Array.from({ length: total - bombs }, () => 0);
  const arr = bombsArr.concat(normalArr).sort(() => Math.random() - 0.5);
  return arr;
}

function getStaticCount(index) {
  const x = index % 10;
  const y = Math.floor(index / 10);
  const count = [];
  if (x - 1 >= 0 && x + 1 <= 9) {
    if (y === 0) {
      count.push(...[index + 1, index - 1, index + 9, index + 10, index + 11]);
    } else if (y === 9) {
      count.push(...[index + 1, index - 1, index - 9, index - 10, index - 11]);
    } else {
      count.push(...makeArr(index, 10));
    }
  } else if (x === 0) {
    if (y === 0) {
      count.push(...[index + 1, index + 10, index + 11]);
    } else if (y === 9) {
      count.push(...[index + 1, index - 10, index - 9]);
    } else {
      count.push(...[index + 1, index + 10, index + 11, index - 10, index - 9]);
    }
  } else {
    if (y === 0) {
      count.push(...[index - 1, index + 10, index + 9]);
    } else if (y === 9) {
      count.push(...[index - 1, index - 10, index - 11]);
    } else {
      count.push(...[index - 1, index - 10, index + 9, index + 10, index - 11]);
    }
  }
  return count;
}

function getBombCount(index: number, arr: number[]): number {
  const countArr = getStaticCount(index);
  console.log("countArr is", countArr);
  let count = 0;
  for (let i = 0; i < countArr.length; i++) {
    if (arr[countArr[i]] !== undefined && arr[countArr[i]]) {
      count++;
    }
  }
  return count;
}

function getFinalData(axisData) {
  //   const axisData = generateData(100, 20);
  const data = [];

  for (let i = 0; i < axisData.length; i++) {
    if (axisData[i]) {
      data[i] = {
        isBomb: true,
        isChecked: false
      };
    } else {
      const bombCount = getBombCount(i, axisData);
      data[i] = {
        bombCount,
        isChecked: false
      };
    }
  }
  return data;
}

const cacheFn = memorize(getStaticCount);

function getRecursiveData(list, index, indexArr = []) {
  console.log(index, "indexindexxss");
  const includedArr = cacheFn(index);

  const filteredArr = includedArr.filter(
    item => !list[item].isBomb && !list[item].bombCount
  );
  console.log(indexArr, index, "kkdkdkdodod ==---");
  if (!filteredArr.length || indexArr.includes(index)) return indexArr;
  indexArr = [...indexArr, index];

  for (let i = 0; i < filteredArr.length; i++) {
    const arr = getRecursiveData(list, filteredArr[i], indexArr);
    indexArr = Array.from(new Set([...indexArr, ...arr]));
  }
  return indexArr;
}

class Sweeper extends Component {
  public state = {
    list: [],
    axisData: []
  };

  componentDidMount() {
    // const axisData = generateData(100, 20);
    // console.log("axisData is", axisData);
    // console.log(getBombCount(0, axisData));
    const axisData = generateData(100, 20);
    const list = getFinalData(axisData);
    console.log(list);
    this.setState({ list });
  }

  public onClick = index => {
    const list = this.state.list.slice();
    if (list[index].isChecked || list[index].isMarked) {
      return;
    }
    list[index].isChecked = true;
    this.setState({ list });
    if (list[index].isBomb) {
      alert("game over");
    } else if (!list[index].bombCount) {
      const chooseIndexArr = getRecursiveData(list, index);
      const checkedArrs = Array.from(
        new Set(
          chooseIndexArr.reduce((prev, next) => {
            const data = prev.concat(cacheFn(next));
            return data;
          }, [])
        )
      ).forEach((i: any) => {
        list[i].isChecked = true;
      });
      this.setState({ list });
    }
  };

  public onMark = index => {
    const list = this.state.list.slice();
    list[index].isMarked = !list[index].isMarked;
    this.setState({ list });
  };

  render() {
    return (
      <div className="grid">
        {this.state.list.map((item, index) => (
          <Mine
            key={index}
            {...item}
            handleClick={() => this.onClick(index)}
            onMark={e => {
              e.preventDefault();
              this.onMark(index);
            }}
          />
        ))}
      </div>
    );
  }
}

export default Sweeper;
