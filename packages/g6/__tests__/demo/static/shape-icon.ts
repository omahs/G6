import { Icon } from '@/src/elements/shapes';
import type { StaticTestCase } from '../types';

export const shapeIcon: StaticTestCase = async (context) => {
  const { canvas } = context;

  const i1 = new Icon({
    style: {
      text: 'text icon',
      fontSize: 24,
      fontWeight: 400,
      fill: 'black',
      x: 50,
      y: 50,
    },
  });

  const i2 = new Icon({
    style: {
      src: 'https://gw.alipayobjects.com/mdn/rms_6ae20b/afts/img/A*N4ZMS7gHsUIAAAAAAAAAAABkARQnAQ',
      width: 128,
      height: 128,
      x: 150,
      y: 150,
      stroke: 'pink',
    },
  });

  canvas.appendChild(i1);
  canvas.appendChild(i2);
};
