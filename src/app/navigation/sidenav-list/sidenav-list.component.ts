import { AuthService } from "./../../auth/auth.service";
import { Component, OnInit, Output, OnDestroy } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-sidenav-list",
  templateUrl: "./sidenav-list.component.html",
  styleUrls: ["./sidenav-list.component.css"],
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeSidenav = new EventEmitter<void>();
  isAuth = false;
  authSubscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe(
      (authStatus) => {
        this.isAuth = authStatus;
      }
    );
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.onClose();
    this.authService.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}
