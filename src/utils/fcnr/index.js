/* eslint-disable no-unused-expressions */
/* eslint-disable no-plusplus */

/*
Был выбран алгоритм Floor Сeiling No Rotation поскольку он обеспечивал высокие результаты
Во время разработки было не ясно как именно определять свободное время на потолке,
поэтому я решил выделить прямоугольную площадь от потолка до наивысшего елемена в полу
*/

function FCNR(container, input) {
  input.sort((a, b) => (a.height > b.height ? -1 : 1));

  const level = [
    {
      level: 0,
      ceil: { x: 0, y: 0 },
      floor: { x: 0, y: 0, mh: 0 },
    },
  ];
  const full = [];

  const n = input.length;
  for (let i = 0; i < n; i++) {
    const nlvl = level.length;
    for (let j = 0; j < nlvl; j++) {
      if (
        input[i].height <= level[j].ceil.y &&
        input[i].width <= container.width - level[j].floor.x
      ) {
        full.push({
          p: 'floor',
          l: level[j].level,
          w: input[i].width,
          h: input[i].height,
          x: level[j].floor.x,
          y: level[j].floor.y,
        });
        level[j].floor.x += input[i].width;
        level[j].floor.mh <= input[i].height
          ? (level[j].floor.mh = input[i].height + level[j].floor.y)
          : false;
        break;
      } else if (
        input[i].width <= container.width - level[j].ceil.x &&
        input[i].height <= level[j].ceil.y - level[j].floor.mh
      ) {
        full.push({
          p: 'ceil',
          l: level[j].level,
          w: input[i].width,
          h: input[i].height,
          x: container.width - level[j].ceil.x,
          y: level[j].ceil.y,
        });

        level[j].ceil.x += input[i].width;
        break;
      } else if (
        input[i].height <= container.height - level[j].ceil.y &&
        nlvl - 1 === j
      ) {
        level.push({
          level: level[j].level + 1,
          ceil: { x: 0, y: input[i].height + level[j].ceil.y },
          floor: { x: 0, y: level[j].ceil.y, mh: 0 },
        });
        full.push({
          p: 'floor-ceil',
          l: level[j].level + 1,
          w: input[i].width,
          h: input[i].height,
          x: level[j + 1].floor.x,
          y: level[j + 1].floor.y,
        });

        level[j + 1].floor.x += input[i].width;
        level[j + 1].ceil.x += input[i].width;
        break;
      }
    }
  }
  return full;
}

export default FCNR;
