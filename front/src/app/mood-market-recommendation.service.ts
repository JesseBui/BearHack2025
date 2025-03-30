import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StockRecommendationService {
  private apiUrl = 'http://127.0.0.1:5000/'; // Your Flask API URL

  constructor(private http: HttpClient) {}

  getStockRecommendations(): Observable<string> {
    return this.http.get(this.apiUrl, { responseType: 'text' }); // Get plain text response
  }

  // If you need to send the mood from the frontend:
  getStockRecommendationsByMood(mood: string): Observable<string> {
    return this.http.post(this.apiUrl, { mood: mood }, { responseType: 'text' });
  }
}