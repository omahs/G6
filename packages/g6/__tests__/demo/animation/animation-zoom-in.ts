import { executor } from '@/src/animations';
import type { Animation } from '@/src/animations/types';
import type { BaseShapeStyleProps } from '@/src/elements/shapes/base-shape';
import { BaseShape } from '@/src/elements/shapes/base-shape';
import { Circle, Group } from '@antv/g';
import type { AnimationTestCase } from '../types';

type ShapeStyleProps = BaseShapeStyleProps & { size: number; color: string; outline: number; outlineOpacity: number };

class Shape extends BaseShape<ShapeStyleProps> {
  private getKeyStyle({ size, color }: any = this.attributes) {
    return {
      r: size / 2,
      fill: color,
    };
  }

  private getHaloStyle({ size, color, outline, outlineOpacity }: any = this.attributes) {
    return {
      r: size / 2,
      fill: 'transparent',
      stroke: color,
      strokeOpacity: outlineOpacity,
      lineWidth: outline,
    };
  }

  public render(attributes: any, container: Group): void {
    this.upsert('key', Circle, this.getKeyStyle(attributes), container);

    this.upsert('halo', Circle, this.getHaloStyle(attributes), container);
  }
}

export const animationZoomIn: AnimationTestCase = async ({ canvas }) => {
  const animation: Animation = [
    {
      fields: ['size', 'color'],
    },
  ];

  const shape = canvas.appendChild(
    new Shape({
      style: {
        x: 100,
        y: 100,
        size: 50,
        color: 'red',
        outline: 8,
        outlineOpacity: 0.3,
        opacity: 0,
      },
    }),
  );

  return executor(
    shape,
    animation,
    { duration: 1000, easing: 'linear', iterations: Infinity, direction: 'alternate' },
    {
      originalStyle: { ...shape.attributes, color: 'orange', size: 0, outline: 0, outlineOpacity: 0.1 },
      states: [],
    },
  );
};

animationZoomIn.times = [0, 500, 1000];
