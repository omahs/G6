import type { Vector2, Vector3 } from '../types';
import { isVector2 } from './is';

const VECTOR_ZERO: Vector3 = [0, 0, 0];

/**
 * <zh/> 两个向量求和
 *
 * <en/> Adds two vectors
 * @param a - <zh/> 第一个向量 | <en/> The first vector
 * @param b - <zh/> 第二个向量 | <en/> The second vector
 * @returns <zh/> 两个向量的和 | <en/> The sum of the two vectors
 */
export function add(a: Vector2 | Vector3, b: Vector2 | Vector3): Vector2 | Vector3 {
  return a.map((v, i) => v + b[i]) as Vector2 | Vector3;
}

/**
 * <zh/> 两个向量求差
 *
 * <en/> Subtracts two vectors
 * @param a - <zh/> 第一个向量 | <en/> The first vector
 * @param b - <zh/> 第二个向量 | <en/> The second vector
 * @returns <zh/> 两个向量的差 | <en/> The difference of the two vectors
 */
export function subtract(a: Vector2 | Vector3, b: Vector2 | Vector3): Vector2 | Vector3 {
  return a.map((v, i) => v - b[i]) as Vector2 | Vector3;
}

/**
 * <zh/> 两个向量求积
 *
 * <en/> Multiplies two vectors
 * @param a - <zh/> 第一个向量 | <en/> The first vector
 * @param b - <zh/> 第二个向量 | <en/> The second vector
 * @returns <zh/> 两个向量的积 | <en/> The dot product of the two vectors
 */
export function multiply(a: Vector2 | Vector3, b: Vector2 | Vector3): Vector2 | Vector3 {
  return a.map((v, i) => v * b[i]) as Vector2 | Vector3;
}

/**
 * <zh/> 两个向量求商
 *
 * <en/> Divides two vectors
 * @param a - <zh/> 第一个向量 | <en/> The first vector
 * @param b - <zh/> 第二个向量 | <en/> The second vector
 * @returns <zh/> 两个向量的商 | <en/> The quotient of the two vectors
 */
export function divide(a: Vector2 | Vector3, b: Vector2 | Vector3): Vector2 | Vector3 {
  return a.map((v, i) => v / b[i]) as Vector2 | Vector3;
}

/**
 * <zh/> 两个向量求点积
 *
 * <en/> Calculates the dot product of two vectors
 * @param a - <zh/> 第一个向量 | <en/> The first vector
 * @param b - <zh/> 第二个向量 | <en/> The second vector
 * @returns <zh/> 两个向量的点积 | <en/> The dot product of the two vectors
 */
export function dot(a: Vector2 | Vector3, b: Vector2 | Vector3): number {
  return (a as number[]).reduce((sum, v, i) => sum + v * b[i], 0);
}

/**
 * <zh/> 两个二维向量求叉积
 *
 * <en/> Calculates the cross product of two vectors in three-dimensional Euclidean space
 * @param a - <zh/> 第一个向量 | <en/> The first vector
 * @param b - <zh/> 第二个向量 | <en/> The second vector
 * @returns <zh/> 两个向量的叉积 | <en/> The cross product of the two vectors
 */
export function cross(a: Vector2 | Vector3, b: Vector2 | Vector3): Vector3 {
  const a2 = toVector3(a);
  const b2 = toVector3(b);
  return [a2[1] * b2[2] - a2[2] * b2[1], a2[2] * b2[0] - a2[0] * b2[2], a2[0] * b2[1] - a2[1] * b2[0]];
}

/**
 * <zh/> 向量缩放
 *
 * <en/> Scales a vector by a scalar number
 * @param a  - <zh/> 向量 | <en/> The vector to scale
 * @param s - <zh/> 缩放系数 | <en/> Scale factor
 * @returns <zh/> 缩放后的向量 | <en/> The scaled vector
 */
export function scale(a: Vector2 | Vector3, s: number): Vector2 | Vector3 {
  return a.map((v) => v * s) as Vector2 | Vector3;
}

/**
 * <zh/> 计算两个向量间的欧几里得距离
 *
 * <en/> Calculates the Euclidean distance between two vectors
 * @param a - <zh/> 第一个向量 | <en/> The first vector
 * @param b - <zh/> 第二个向量 | <en/> The second vector
 * @returns <zh/> 两个向量间的距离 | <en/> The distance between the two vectors
 */
export function distance(a: Vector2 | Vector3, b: Vector2 | Vector3): number {
  return Math.sqrt((a as number[]).reduce((sum, v, i) => sum + (v - b[i] || 0) ** 2, 0));
}

/**
 * <zh/> 计算两个向量间的曼哈顿距离
 *
 * <en/> Calculates the Manhattan distance between two vectors
 * @param a - <zh/> 第一个向量 | <en/> The first vector
 * @param b - <zh/> 第二个向量 | <en/> The second vector
 * @returns <zh/> 两个向量间的距离 | <en/> The distance between the two vectors
 */
export function manhattanDistance(a: Vector2 | Vector3, b: Vector2 | Vector3): number {
  return (a as number[]).reduce((sum, v, i) => sum + Math.abs(v - b[i]), 0);
}

/**
 * <zh/> 标准化向量（使长度为 1）
 *
 * <en/> Normalizes a vector (making its length 1)
 * @param a - <zh/> 要标准化的向量 | <en/> The vector to normalize
 * @returns <zh/> 标准化后的向量 | <en/> The normalized vector
 */
export function normalize(a: Vector2 | Vector3): Vector2 | Vector3 {
  const length = (a as number[]).reduce((sum, v) => sum + v ** 2, 0);
  return a.map((v) => v / Math.sqrt(length)) as Vector2 | Vector3;
}

/**
 * <zh/> 计算两个向量间的夹角
 *
 * <en/> Get the angle between two vectors
 * @param a - <zh/> 第一个向量 | <en/> The first vector
 * @param b - <zh/> 第二个向量 | <en/> The second vector
 * @returns  <zh/> 弧度值 | <en/> The angle in radians
 */
export function angle(a: Vector2 | Vector3, b: Vector2 | Vector3): number {
  return Math.acos(
    (multiply(a, b) as number[]).reduce((sum: number, v: number) => sum + v, 0) /
      (distance(a, VECTOR_ZERO) * distance(b, VECTOR_ZERO)),
  );
}

/**
 * <zh/> 判断两个向量是否完全相等（使用 === 比较）
 *
 * <en/> Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 * @param a - <zh/> 第一个向量 | <en/> The first vector
 * @param b - <zh/> 第二个向量 | <en/> The second vector
 * @returns  - <zh/> 是否相等 | <en/> Whether or not the vectors are equal
 */
export function exactEquals(a: Vector2 | Vector3, b: Vector2 | Vector3): boolean {
  return (a as number[]).every((v, i) => v === b[i]);
}

/**
 * <zh/> 计算向量的垂直向量
 *
 * <en/> Calculates the perpendicular vector to a given vector
 * @param a - <zh/> 原始向量 | <en/> The original vector
 * @returns <zh/> 原始向量的垂直向量 | <en/> The perpendicular vector to the original vector
 */
export function perpendicular(a: Vector2): Vector2 {
  return [-a[1], -a[0]];
}

/**
 * <zh/> 向量强制转换为二维向量
 *
 * <en/> Force vector to be two-dimensional
 * @param a - <zh/> 原始向量 | <en/> The original vector
 * @returns <zh/> 二维向量 | <en/> Two-dimensional vector
 */
export function toVector2(a: Vector2 | Vector3): Vector2 {
  return [a[0], a[1]];
}

/**
 * <zh/> 向量强制转换为三维向量
 *
 * <en/> Force vector to be three-dimensional
 * @param a - <zh/> 原始向量 | <en/> The original vector
 * @returns  - <zh/> 三维向量 | <en/> Three-dimensional vector
 */
export function toVector3(a: Vector2 | Vector3): Vector3 {
  return isVector2(a) ? [a[0], a[1], 0] : a;
}
