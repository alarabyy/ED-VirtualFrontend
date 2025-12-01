// src/app/pages/Public/pages/profile/services/profile.service.ts

import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ProfileResponse, Toggle2FAResponse } from '../models/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http = inject(HttpClient);
  
  // Use 'users/me' for current user operations
  private baseUrl = `${environment.apiBaseUrl}/users`; 

  /**
   * Get Current User Profile (Public View or Self)
   */
  getProfile(username: string): Observable<ProfileResponse> {
    const encodedUsername = encodeURIComponent(username);
    return this.http.get<ProfileResponse>(`${this.baseUrl}/profile/${encodedUsername}`);
  }

  /**
   * Update My Profile (Multipart/Form-Data)
   * Sends text fields + optional image file.
   */
  updateMyProfile(data: any, file?: File): Observable<ProfileResponse> {
    const formData = new FormData();
    
    // Append Text Fields
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });

    // Append File if exists
    if (file) {
      formData.append('avatar', file);
    }

    return this.http.put<ProfileResponse>(`${this.baseUrl}/me/update-profile`, formData);
  }

  /**
   * Toggle Two-Factor Authentication
   */
  toggle2FA(): Observable<Toggle2FAResponse> {
    return this.http.post<Toggle2FAResponse>(`${this.baseUrl}/me/toggle-2fa`, {});
  }
}