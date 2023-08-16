export type Directory = {
  id: number,
  parentId?: Directory['id'],
  title: string,
  children?: Directory[],
};
