class ReturnStatisticResult {
  // For STF
  static returnStatisticResultSTF(data) {
    const result = {
      total: 0,
    };

    for (let i of data) {
      switch (i.SituationModelId) {
        case 1:
          result.waiting = i.count;
          break;
        case 2:
          result.processing = i.count;
          break;
        case 3:
          result.received = i.count;
          break;
        case 4:
          result.providing = i.count;
          break;
      }
      result.total += Number(i.count);
    }
    return result;
  }

  // For SM
  static returnStatisticResultSM(data) {
    const result = {
      total: 0,
    };

    for (let i of data) {
      switch (i.SituationModelId) {
        case 2:
          result.processing = i.count;
          break;
        case 3:
          result.received = i.count;
          break;
        case 4:
          result.providing = i.count;
          break;
      }
      if (i.SituationModelId !== 1) {
        result.total += Number(i.count);
      }
    }
    console.log('res ',result);
    return result;
  }
}

module.exports = ReturnStatisticResult;