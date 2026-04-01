import { TabGroup, TabList, Tab } from "@headlessui/react";
import { motion } from "motion/react";
import {ReactNode, useId} from "react";

import styles from './tabs.module.css';

type Option = {
  label: string | ReactNode;
  value: string;
}

type TabsProps = {
  value?: string;
  options: Array<Option>;
  onChange?: (value: Option) => void;
}

export function Tabs({value, options, onChange}: TabsProps) {
  const id = useId();

  const selectedOption = options.findIndex(option => option.value === value);

    return (
    <TabGroup selectedIndex={selectedOption} onChange={index => onChange(options[index])}>
      <TabList className="border-2 br-l p-1 shadow bg-white">
        {options.map(({label, value}, index) => (
          <Tab as="button" className="px-2 py-1 isolate br-m relative outline-offset-4" key={value}>
            {index === selectedOption && (
              <motion.div className={styles.selected + " bg-orange-300 border-2 inset-0 br-m absolute w-full h-full -z-1"} layout="position" layoutId={id + "selectedTab"}></motion.div>
            )}
            <>
              {label}
            </>
          </Tab>
        ))}
      </TabList>
    </TabGroup>
  )
}