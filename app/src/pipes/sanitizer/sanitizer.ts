import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the SanitizerPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'sanitizer',
})
export class SanitizerPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return this.sanitizer.bypassSecurityTrustUrl(value);
  }
}
