import { faPlus } from '@fa/classic/solid';

import { getPedalsGroupedByBrand } from '@/app/api/pedals';
import { ButtonIcon } from '@/components/button-icon';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/drawer';

import AddPedalSection from './AddPedalSection';
import PlaygroundTitle from './PlaygroundTitle';

export default async function Sidebar() {
  const options = await getPedalsGroupedByBrand();

  const sidebarContent = (
    <>
      <PlaygroundTitle />
      <AddPedalSection options={options} />
    </>
  );

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
