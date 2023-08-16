import styles from './Item.module.scss';

import { type Directory } from '../types/directory';

export default function Item({
  directory,
  isSelected,
  onDirectorySelected,
}: {
  directory: Directory,
  isSelected: (category: Directory) => boolean,
  onDirectorySelected: (category: Directory) => void,
}) {
  return (
    <>
      <div
        className={isSelected(directory) ? styles.itemSelected : styles.item}
      >
        <p onClick={() => onDirectorySelected(directory)}>
          {directory.title}
        </p>
      </div >
      <ol>
        {directory.children?.map(directory => (
          <li key={directory.id}>
            <Item
              directory={directory}
              isSelected={isSelected}
              onDirectorySelected={onDirectorySelected}
            />
          </li>
        ))}
      </ol>
    </>
  );
}