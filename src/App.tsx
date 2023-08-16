import { useEffect, useState } from 'react';

import styles from './App.module.scss';

import { type Directory } from './types/directory';
import { calculateBreadcrumb, transformCategories } from './utils/directory-utils';

import Item from './components/Item';
import Breadcrumb from './components/Breadcrumb';

export default function App() {
  const [directories, setDirectories] = useState<Directory[]>();
  const [selectedDirectory, setSelectedDirectory] = useState<Directory>();

  function fetchDirectories() {
    fetch('./directories.json')
      .then(response => response.json())
      .then(data => setDirectories(data as Directory[]));
  }

  useEffect(() => {
    fetchDirectories();
  }, []);

  return (
    <>
      <h1 className={styles.title}>Directories</h1>
      {directories && (
        <>
          {selectedDirectory && (
            <Breadcrumb
              breadcrumb={calculateBreadcrumb(directories, selectedDirectory)}
            />
          )}
          <ol className={styles.tree}>
            {transformCategories(directories).map(directory => (
              <li key={directory.id}>
                <Item
                  directory={directory}
                  isSelected={directory => directory.id === selectedDirectory?.id}
                  onDirectorySelected={setSelectedDirectory}
                />
              </li>
            ))}
          </ol>
        </>
      )}
    </>
  );
}
