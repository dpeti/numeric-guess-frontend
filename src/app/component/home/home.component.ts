import { Component } from '@angular/core';
import {GameService} from '../../service/game.service';
import {Subscription} from 'rxjs';
import {GameDto} from '../../model/game.dto';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  private gameSubs: Subscription;

  game: GameDto;

  constructor(public gameService: GameService,
              private router: Router) { }

  newGame(): void {
    if (this.gameSubs) {
      this.gameSubs.unsubscribe();
    }
    this.gameSubs = this.gameService.initGame().subscribe(value => {
      this.game = new GameDto(value);
      this.router.navigate([`./game/${this.game.publicId}`]);
    });
  }
}
