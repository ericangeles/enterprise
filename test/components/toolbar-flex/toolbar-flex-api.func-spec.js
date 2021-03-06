import { ToolbarFlex } from '../../../src/components/toolbar-flex/toolbar-flex';
import { ToolbarFlexItem } from '../../../src/components/toolbar-flex/toolbar-flex.item';

const toolbarFavorButtonsetHTML = require('../../../app/views/components/toolbar-flex/example-favor-buttonset.html');
const svg = require('../../../src/components/icons/svg.html');

let toolbarEl;
let toolbarAPI;
let rowEl;
let svgEl;

describe('Flex Toolbar', () => {
  beforeEach(() => {
    toolbarEl = null;
    toolbarAPI = null;
    svgEl = null;
    rowEl = null;

    document.body.insertAdjacentHTML('afterbegin', svg);
    document.body.insertAdjacentHTML('afterbegin', toolbarFavorButtonsetHTML);

    rowEl = document.body.querySelector('.row');
    svgEl = document.body.querySelector('.svg-icons');
    toolbarEl = document.body.querySelector('.flex-toolbar');
    toolbarAPI = new ToolbarFlex(toolbarEl);
  });

  afterEach(() => {
    toolbarAPI.destroy();
    rowEl.parentNode.removeChild(rowEl);
    svgEl.parentNode.removeChild(svgEl);
  });

  it('Should be invoked', () => {
    expect(toolbarAPI).toEqual(jasmine.any(ToolbarFlex));
  });

  it('Can be disabled and re-enabled', () => {
    toolbarAPI.disabled = true;

    expect(toolbarEl.className.indexOf('is-disabled')).toBeGreaterThan(-1);

    toolbarAPI.disabled = false;

    expect(toolbarEl.className.indexOf('is-disabled')).toEqual(-1);
  });

  it('Should have 6 items', () => {
    expect(toolbarAPI.items).toBeDefined();
    expect(toolbarAPI.items.length).toBe(6);
  });

  it('Should have 4 sections', () => {
    expect(toolbarAPI.sections).toBeDefined();
    expect(toolbarAPI.sections.length).toBe(4);
  });

  it('Should be completely rendered after the page is loaded', () => {
    expect(toolbarEl.getAttribute('role')).toBe('toolbar');
  });

  it('Should automatically set its focused item to the first toolbar item', () => {
    const focused = toolbarAPI.focusedItem;

    expect(focused).toEqual(jasmine.any(ToolbarFlexItem));

    const items = toolbarAPI.items;

    expect(items.indexOf(focused)).toBe(0);
  });

  it('Can detect all items present inside that should be invoked as Toolbar Flex Items', () => {
    const els = toolbarAPI.getElements();

    expect(els).toBeDefined();
    expect(els.length).toBe(6);
    expect(els[0]).toEqual(jasmine.any(HTMLElement));
  });

  it('Can get a `ToolbarFlexItem` instance from one of its internal elements', () => {
    const els = toolbarAPI.getElements();
    const item = toolbarAPI.getItemFromElement(els[0]);

    expect(item).toBeDefined();
    expect(item).toEqual(jasmine.any(ToolbarFlexItem));
    expect(item.type).toEqual('button');
    expect(item.disabled).toBeFalsy();
  });

  it('Can check for which of its items belongs in an overflow menu', () => {
    // Test doesn't pass unless we have an actual width on the toolbar
    rowEl.style.width = '20000px';
    let overflow = toolbarAPI.overflowedItems;

    // Normal overflow situation should be that nothing is overflowed.
    expect(overflow).toBeDefined();
    expect(overflow.length).toBe(0);

    // Change width of the container to change the overflow scenario.
    rowEl.style.width = '700px';
    overflow = toolbarAPI.overflowedItems;

    expect(overflow.length).toBe(3);
    expect(overflow[0]).toEqual(jasmine.any(ToolbarFlexItem));
    expect(overflow[0].overflowed).toBeTruthy();
  });

  it('Can programmatically navigate toolbar items', () => {
    // Test doesn't pass unless we have an actual width on the toolbar
    rowEl.style.width = '20000px';

    const items = toolbarAPI.items;
    let focusedItem = toolbarAPI.focusedItem;

    expect(focusedItem).toEqual(items[0]);

    // Navigate to the right
    toolbarAPI.navigate(2);
    focusedItem = toolbarAPI.focusedItem;

    // Item isn't "2" here because the item at index 2 is disabled, so it skips to "3"
    expect(focusedItem).toEqual(items[3]);

    // Navigate to the left
    toolbarAPI.navigate(-2);
    focusedItem = toolbarAPI.focusedItem;

    expect(focusedItem).toEqual(items[1]);

    // Run with no directional change (should give the same result)
    toolbarAPI.navigate(0);
    focusedItem = toolbarAPI.focusedItem;

    expect(focusedItem).toEqual(items[1]);
  });

  /*
   * NOTE: Not sure if this ought to be a functional test... ideally the API should be
   * tested, but the menu isn't rendered until the Popupmenu opens for the first time.
   */
  xit('Links action button list items to toolbar items', (done) => {
    // Change width of the container to change the overflow scenario.
    rowEl.style.width = '500px';
    const items = toolbarAPI.items;

    // Can't check these conditions until after the popupmenu's been opened
    // and completely rendered.
    $(items[5].element).on('open.test', () => {
      // Check `items[1]` which is the menu button
      expect(items[1].overflowed).toBeTruthy();
      expect(items[1].actionButtonLink).toBeDefined();
      expect(items[1].actionButtonLink).toEqual(jasmine.any(HTMLElement));

      const menuItem = items[1].actionButtonLink;
      const originalButton = $(menuItem).data('original-button');

      expect(originalButton).toEqual(items[1].element);
      done();
    });

    // Open the action button popupmenu first
    items[5].componentAPI.open();
  });

  it('Selects a toolbar item by element reference', () => {
    const items = toolbarAPI.items;

    toolbarAPI.select(items[3].element);

    expect(items[0].selected).toBeFalsy();
    expect(items[3].selected).toBeTruthy();
    expect(items[3].element.className.indexOf('is-selected')).toBeGreaterThan(-1);
  });

  it('Selects a toolbar item by using its ToolbarFlexItem instance', () => {
    const items = toolbarAPI.items;

    toolbarAPI.select(items[3]);

    expect(items[0].selected).toBeFalsy();
    expect(items[3].selected).toBeTruthy();
    expect(items[3].element.className.indexOf('is-selected')).toBeGreaterThan(-1);
  });

  it('Can build an object representation of the current set of toolbar elements', () => {
    const data = toolbarAPI.toData();

    // Basic checks
    expect(data).toBeDefined();
    expect(data.items).toBeDefined();
    expect(data.items.length).toBe(6);

    // Item placement checks
    expect(data.items[0].type).toEqual('button');
    expect(data.items[0].text).toEqual('Text Button');
    expect(data.items[0].visible).toBeTruthy();
    expect(data.items[0].focused).toBeTruthy();
    expect(data.items[0].disabled).toBeFalsy();

    expect(data.items[4].type).toEqual('searchfield');
    expect(data.items[4].focused).toBeFalsy();
    expect(data.items[4].disabled).toBeFalsy();
    expect(data.items[4].readOnly).toBeDefined();
    expect(data.items[4].readOnly).toBeFalsy();
    expect(data.items[4].componentAPI).toEqual(jasmine.any(Object)); // Soho Searchfield component

    expect(data.items[1].type).toEqual('menubutton');
    expect(data.items[1].submenu).toBeDefined();
    expect(data.items[1].submenu.length).toBe(3);
    expect(data.items[1].submenu[0].text).toEqual('Item One');
  });

  it('Can build an object representation of the current set of toolbar elements, that can be consumed by a popupmenu', () => {
    const data = toolbarAPI.toPopupmenuData();

    // Basic checks
    expect(data).toBeDefined();
    expect(data.menu).toBeDefined();
    expect(data.menu.length).toBe(4);

    // Item placement checks
    expect(data.menu[2].text).toEqual('Settings');
    expect(data.menu[2].icon).toEqual('settings');

    expect(data.menu[1].submenu).toBeDefined();
    expect(data.menu[1].submenu.length).toBe(3);
  });

  describe('Item', () => {
    it('Can be invoked by its parent Toolbar', () => {
      const item = toolbarAPI.items[0];
      const elementAPI = $(item.element).data('toolbarflexitem');

      expect(elementAPI).toBeDefined();
      expect(elementAPI).toEqual(jasmine.any(ToolbarFlexItem));

      expect(item.section).toBeDefined();
      expect(item.toolbar).toEqual(toolbarEl);
    });

    it('Can be individually disabled and re-enabled', () => {
      const item = toolbarAPI.items[2];

      expect(item.disabled).toBeTruthy();
      expect(item.element.getAttribute('aria-disabled')).toBeTruthy();
    });

    it('Can individually become hidden and re-displayed', () => {
      const item = toolbarAPI.items[3];

      expect(item.visible).toBeTruthy();

      item.hide();

      expect(item.visible).toBeFalsy();

      item.show();

      expect(item.visible).toBeTruthy();
    });

    it('Can announce whether or not it can become the focused item', () => {
      // Test doesn't pass unless we have an actual width on the toolbar
      rowEl.style.width = '20000px';
      const menuButton = toolbarAPI.items[1];

      expect(menuButton.focusable).toBeTruthy();

      // The icon button is disabled by default
      const iconButton = toolbarAPI.items[2];

      expect(iconButton.focusable).toBeFalsy();

      const secondIconButton = toolbarAPI.items[3];
      secondIconButton.hide();

      expect(secondIconButton.focusable).toBeFalsy();
    });

    it('Can individually be set as the focused toolbar item', () => {
      const item = toolbarAPI.items[1];
      item.focused = true;

      expect(item.element.tabIndex).toEqual(0);
      expect(item.focused).toBeTruthy();
    });

    it('Can be set to readonly, if allowed by the field type', () => {
      const searchfieldItem = toolbarAPI.items[4];
      searchfieldItem.readOnly = true;

      expect(searchfieldItem.readOnly).toBeTruthy();
      expect(searchfieldItem.element.readOnly).toBeTruthy();
    });

    it('Can not be readonly and disabled at the same time, if allowed by the field type', () => {
      const searchfieldItem = toolbarAPI.items[4];
      searchfieldItem.readOnly = true;
      searchfieldItem.disabled = true;

      expect(searchfieldItem.readOnly).toBeFalsy();
      expect(searchfieldItem.element.readOnly).toBeFalsy();
      expect(searchfieldItem.disabled).toBeTruthy();
      expect(searchfieldItem.element.disabled).toBeTruthy();

      searchfieldItem.readOnly = true;

      expect(searchfieldItem.readOnly).toBeTruthy();
      expect(searchfieldItem.element.readOnly).toBeTruthy();
      expect(searchfieldItem.disabled).toBeFalsy();
      expect(searchfieldItem.element.disabled).toBeFalsy();
    });

    it('Can individually be selected', () => {
      const item = toolbarAPI.items[1];
      item.selected = true;

      expect(item.selected).toBe(true);
      expect(item.element.className.indexOf('is-selected')).toBeGreaterThan(-1);
    });

    it('Can individually determine that it should be placed into overflow', () => {
      rowEl.style.width = '700px';
      const textButton = toolbarAPI.items[0];

      expect(textButton.overflowed).toBeFalsy();

      const secondIconButton = toolbarAPI.items[3];

      expect(secondIconButton.overflowed).toBeTruthy();
    });
  });
});
