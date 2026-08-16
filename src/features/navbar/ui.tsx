import { Link } from "react-router-dom";

import { forwardRef, PropsWithChildren } from "react";

import { Tabs } from "shared/ui";
import { redirectTo } from "shared/contracts";
import { Key } from "@heroui/react";

function _Navbar(_: PropsWithChildren, ref: React.ForwardedRef<HTMLElement>) {
  const handleSelectionChange = (value: Key) => {
    redirectTo("/" + value);
  }

  return (
    <nav tabIndex={-1} ref={ref}> 
      <Tabs onSelectionChange={handleSelectionChange}>
        <Tabs.ListContainer>
          <Tabs.List aria-label="Main navigation">
            <Tabs.Tab id="dashboard">
              Dashboard
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="widgets">
              Widgets
              <Tabs.Indicator />
            </Tabs.Tab>
            <Tabs.Tab id="settings">
              Settings
              <Tabs.Indicator />
            </Tabs.Tab>
          </Tabs.List>
          
        </Tabs.ListContainer> 
      </Tabs>
    </nav>
  )
}

const Navbar = forwardRef(_Navbar);

export { Navbar };