import { faPlus } from '@fa/classic/solid';

import { ButtonIcon } from '@/components/button-icon';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/drawer';

export default function Sidebar() {
  const sidebarContent = <div>sidebar content</div>;

  return (
    <>
      <aside className="bg-background border-border shadow-shadow m-2.5 mr-0 w-[304px] rounded-lg border max-lg:hidden">
        {sidebarContent}
      </aside>

      <Drawer>
        <DrawerTrigger asChild>
          <ButtonIcon
            className="absolute bottom-7 left-1/2 size-16 -translate-x-1/2 rounded-full p-4 lg:hidden"
            icon={faPlus}
            variant="primary"
          />
        </DrawerTrigger>
        <DrawerContent>{sidebarContent}</DrawerContent>
      </Drawer>
    </>
  );
}
