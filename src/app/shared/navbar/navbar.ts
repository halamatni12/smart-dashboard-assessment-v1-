import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent implements AfterViewInit {

  constructor(public router: Router) {}

ngAfterViewInit() {
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');

  tooltipTriggerList.forEach((el: any) => {
    const tooltip = new bootstrap.Tooltip(el, { trigger: 'hover' });

    el.addEventListener('click', () => {
      tooltip.hide();
    });
    
    el.addEventListener('blur', () => {
      tooltip.hide();
    });
  });
}



}
