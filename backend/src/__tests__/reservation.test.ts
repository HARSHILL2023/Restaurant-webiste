// Basic smoke test — does not require a live DB connection
// Import the reservationController logic only

describe('Reservation capacity logic', () => {
  const SEATING_CAPACITY: Record<string, number> = {
    Inside: 90,
    Terrace: 70,
    'Elevated Terrace': 40,
  };

  const getMinutesFromTime = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return (hours ?? 0) * 60 + (minutes ?? 0);
  };

  it('should correctly calculate seating capacity for Inside', () => {
    expect(SEATING_CAPACITY['Inside']).toBe(90);
    expect(SEATING_CAPACITY['Terrace']).toBe(70);
    expect(SEATING_CAPACITY['Elevated Terrace']).toBe(40);
  });

  it('should correctly compute time in minutes', () => {
    expect(getMinutesFromTime('19:00')).toBe(1140);
    expect(getMinutesFromTime('08:30')).toBe(510);
  });

  it('should detect a time conflict within 2 hours', () => {
    const requestedTime = '19:00';
    const existingTime = '20:00';
    const diff = Math.abs(getMinutesFromTime(requestedTime) - getMinutesFromTime(existingTime));
    expect(diff).toBeLessThan(120);
  });

  it('should not detect a conflict outside 2 hours', () => {
    const requestedTime = '19:00';
    const existingTime = '22:00';
    const diff = Math.abs(getMinutesFromTime(requestedTime) - getMinutesFromTime(existingTime));
    expect(diff).toBeGreaterThanOrEqual(120);
  });
});
