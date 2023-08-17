import { useEffect, useState } from 'react';
import { type Input, is } from "valibot";

import styles from './App.module.scss';

import { type Directory } from './types/directory';
import { DirectorySchema } from './schemas/directory-schema';
import { calculateBreadcrumb, transformDirectories } from './utils/directory-utils';
import { isArray } from './utils/general';

import Item from './components/Item';
import Breadcrumb from './components/Breadcrumb';
import { Prettify } from './types/utils';

export default function App() {
  const [directories, setDirectories] = useState<Directory[]>();
  const [selectedDirectory, setSelectedDirectory] = useState<Directory>();

  function fetchDirectories() {
    fetch('./directories.json')
      .then(response => response.json())
      .then(data => {
        if (isArray(data)) {
          type DirectoryOutput = Prettify<Input<typeof DirectorySchema>>;
          //   ^?

          setDirectories(data.filter((d): d is DirectoryOutput => is(DirectorySchema, d)));
        }
      });
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
            {transformDirectories(directories).map(directory => (
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
