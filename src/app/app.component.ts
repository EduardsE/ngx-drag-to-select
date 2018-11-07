import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { DndDropEvent } from 'ngx-drag-drop';

const json = require('../../projects/ngx-drag-to-select/package.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  documents: Array<any> = [];
  selectedDocuments: Array<any> = [];
  selectOnDrag = true;
  selectMode = false;
  disable = false;
  isDesktop = false;
  selectWithShortcut = false;

  draggable = {
    // note that data is handled with JSON.stringify/JSON.parse
    // only set simple data or POJO's as methods will be lost
    data: "myDragData",
    effectAllowed: "all",
    disable: false,
  };


  constructor(
    private titleService: Title,
    private breakpointObserver: BreakpointObserver,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIcon('apple', sanitizer.bypassSecurityTrustResourceUrl('assets/apple-icon.svg'));
    iconRegistry.addSvgIcon('windows', sanitizer.bypassSecurityTrustResourceUrl('assets/windows-icon.svg'));
  }

  ngOnInit() {
    const currentTitle = this.titleService.getTitle();

    if (json) {
      this.titleService.setTitle(`${currentTitle}: v${json.version}`);
    }

    const breakpoints = [Breakpoints.Medium, Breakpoints.Large, Breakpoints.XLarge];

    this.breakpointObserver.observe(breakpoints).subscribe(state => {
      this.isDesktop = this.breakpointObserver.isMatched(breakpoints);
    });

    for (let id = 1; id <= 12; id++) {
      this.documents.push({
        id,
        name: `Document ${id}`
      });
    }
  }


  onSelect(items: Array<any>) {
    // Do something with the selected items
  }


  onDragStart(event: DragEvent) {}

  onDragEnd(event: DragEvent) {}

  onDraggableCopied(event: DragEvent) {}

  onDraggableLinked(event: DragEvent) {}

  onDraggableMoved(event: DragEvent) {}

  onDragCanceled(event: DragEvent) {}

  onDragover(event: DragEvent) {
  }

  onDrop(event: DndDropEvent) {
  }
}
