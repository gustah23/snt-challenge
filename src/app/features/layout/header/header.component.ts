import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <header class="snt__header">
      <img src="../../../../assets/images/logo.svg" alt="Santander">
      <h1>
        UI Challenge - Luiz Perez
      </h1>
    </header>
  `,
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {}
