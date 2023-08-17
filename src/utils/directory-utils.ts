import { Directory } from "../types/directory";

export function transformDirectories(flatDirectories: Directory[]): Directory[] {
  const directories: Directory[] = [];

  function map(c: Directory[]): Directory[] {
    return directories.concat(c.map(directory => ({
      id: directory.id,
      parentId: directory.parentId,
      title: directory.title,
      children: map(flatDirectories.filter(x => x.parentId === directory.id)),
    })));
  }

  // Top level directories are directories without parentIds
  return map(flatDirectories.filter(directory => !directory.parentId));
}

export function calculateBreadcrumb(
  directories: Directory[],
  selectedDirectory: Directory,
): Directory[] {
  const parent = directories
    .find(directory => directory.id === selectedDirectory.parentId);

  if (!parent) {
    return [selectedDirectory];
  }

  return [selectedDirectory].concat(calculateBreadcrumb(directories, parent));
}
