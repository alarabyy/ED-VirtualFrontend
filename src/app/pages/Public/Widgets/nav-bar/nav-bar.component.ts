import { Component, OnInit, inject, OnDestroy, HostListener } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../Auth/Service/auth'; // تأكد من المسار

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  providers: [DatePipe]
})
export class NavBarComponent implements OnInit, OnDestroy {
  
  public authService = inject(AuthService);
  
  isMenuOpen = false;
  currentDate = new Date();
  isLoggedIn = false;
  currentUsername: string | null = null;
  isScrolled = false; 

  // Permissions Flags
  canViewDashboard = false;
  
  private userSub!: Subscription;

  ngOnInit() {
    this.userSub = this.authService.currentUser$.subscribe(user => {
      this.isLoggedIn = !!user;
      
      if (user) {
        this.currentUsername = user.username || user.unique_name || user.email;
        this.canViewDashboard = this.authService.hasPermission('Permissions.Dashboard.View')
      } else {
        this.resetPermissions();
      }
    });
  }

  resetPermissions() {
    this.currentUsername = null;
    this.canViewDashboard = false;
  }

  toggleMenu() { this.isMenuOpen = !this.isMenuOpen; }
  
  logout() {
    this.authService.logout();
    this.isMenuOpen = false;
  }

  // إضافة تأثير عند عمل Scroll للصفحة
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  ngOnDestroy() {
    if (this.userSub) this.userSub.unsubscribe();
  }
}