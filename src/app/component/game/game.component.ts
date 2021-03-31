import { Component, OnInit } from '@angular/core';
import {GameService} from '../../service/game.service';
import {Subscription} from 'rxjs';
import {GameDto} from '../../model/game.dto';
import {ActivatedRoute, Router} from '@angular/router';
import {ResultDto} from '../../model/result.dto';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  private gameSubs: Subscription;
  private gameCheckSubs: Subscription;
  private paramsSubs: Subscription;

  game: GameDto;
  result: ResultDto = new ResultDto();
  gameId: string;

  number: number;

  lower: boolean;
  greater: boolean;
  equal: boolean;

  constructor(public gameService: GameService,
              private activedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.paramsSubs = this.activedRoute.params.subscribe(param => {
      this.gameId = param.gameId;
      this.loadGame();
    });
  }

  private loadGame(): void {
    if (this.gameSubs) {
      this.gameSubs.unsubscribe();
    }
    this.gameSubs = this.gameService.initGame().subscribe(value => {
      this.game = new GameDto(value);
    }, error => {
      this.router.navigate([`./not-found`]);
    });
  }

  onSubmit(): void {
    if (this.gameCheckSubs) {
      this.gameCheckSubs.unsubscribe();
    }
    this.gameCheckSubs = this.gameService.check(this.gameId, this.number).subscribe(value => {
      this.result = new ResultDto(value);
      this.checkResult();
    });
  }

  private checkResult(): void {
    this.resetErrors();
    if (this.result.result === 'EQUAL') {
      this.equal = true;
    }
    if (this.result.result === 'GREATER') {
      this.greater = true;
    }
    if (this.result.result === 'LOWER') {
      this.lower = true;
    }
  }

  private resetErrors(): void {
    this.greater = false;
    this.lower = false;
  }
}
