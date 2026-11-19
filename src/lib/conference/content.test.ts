import { describe, expect, it } from 'vitest';
import { contentSchema, defaultContent, event } from './content';
describe('Official Lomé conference facts', () => {
  it('takes place on 14 and 15 May 2027', () => { expect(event.startDate).toBe('2027-05-14'); expect(event.endDate).toBe('2027-05-15'); });
  it('has a side event on 13 May', () => expect(event.sideDate).toBe('2027-05-13'));
  it('uses the Lomé Togo location', () => { expect(event.city).toBe('Lomé'); expect(event.country).toBe('Togo'); });
  it('keeps the three targets', () => expect(event.targets).toEqual({ participants: 500, universities: 10, partners: 10 }));
  it('retains the two official Tally forms', () => { expect(event.partnerForm).toBe('https://tally.so/r/rDO9pv'); expect(event.speakerForm).toBe('https://tally.so/r/EqlVMX'); });
  it('does not invent confirmed people or venues', () => { expect(defaultContent.speakers).toEqual([]); expect(defaultContent.partners).toEqual([]); expect(defaultContent.venue).toBe(''); expect(defaultContent.program).toEqual([]); });
  it('rejects unsafe external addresses', () => expect(contentSchema.safeParse({ ...defaultContent, registrationUrl: 'javascript:alert(1)' }).success).toBe(false));
});
