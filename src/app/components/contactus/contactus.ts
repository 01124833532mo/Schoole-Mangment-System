import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-contactus',
  template: `
    <section class="contact-wrap">
      <h2>Contact Us</h2>
      <p>If you need help with the portal, please email support@demo.local.</p>
    </section>
  `,
  styles: [
    `
      .contact-wrap {
        padding: 24px;
        background: #ffffff;
        border: 1px solid #dbe7e4;
        border-radius: 12px;
        margin: 20px;
      }

      h2 {
        margin-bottom: 8px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contactus {}
