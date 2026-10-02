(function () {
  function record(value) { return value !== null && typeof value === 'object' && !Array.isArray(value); }
  function parse(value) {
    if (!record(value) || value.v !== 1) throw new Error('Invalid progress version');
    for (const key of ['answered', 'modules', 'mock', 'target']) {
      if (!record(value[key])) throw new Error(`Invalid progress ${key}`);
    }
    for (const answer of Object.values(value.answered)) {
      if (!record(answer) || typeof answer.correct !== 'boolean') throw new Error('Invalid answer record');
      if (answer.streak !== undefined && (!Number.isInteger(answer.streak) || answer.streak < 0)) throw new Error('Invalid answer streak');
    }
    if (Object.values(value.modules).some(item => typeof item !== 'boolean')) throw new Error('Invalid module progress');
    for (const mock of Object.values(value.mock)) {
      if (!record(mock) || typeof mock.score !== 'number' || !Number.isFinite(mock.score) || mock.score < 0 || mock.score > 100) throw new Error('Invalid mock result');
    }
    if (Object.values(value.target).some(item => typeof item !== 'string')) throw new Error('Invalid target date');
    return { v: 1, answered: value.answered, modules: value.modules, mock: value.mock, target: value.target };
  }
  window.FTE_PROGRESS = { parse };
})();
