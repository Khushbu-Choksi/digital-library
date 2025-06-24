import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'digital-library';

  loginAsLibrarian() {
    alert('You expect too much! Implement login as Librarian yourself!');
    // Add navigation logic here
  }

  loginAsUser() {
    alert('You expect too much! Implement login as User yourself!');
    // Add navigation logic here
  }
}
