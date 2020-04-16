function validateCpf(strCPF) {
  let sum = 0;
  let rest;

  if (strCPF === '00000000000') return false;

  for (let i = 1; i <= 9; i += 1)
    sum += Number(strCPF.substring(i - 1, i)) * (11 - i);
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== Number(strCPF.substring(9, 10))) return false;

  sum = 0;
  for (let i = 1; i <= 10; i += 1)
    sum += Number(strCPF.substring(i - 1, i)) * (12 - i);
  rest = (sum * 10) % 11;

  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== Number(strCPF.substring(10, 11))) return false;
  return true;
}

export default validateCpf;
