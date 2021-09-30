interface Flight {
    num: string;
    from: string;
    to: string;
    from_date: string;
    to_date: string;
    plane: string;
    duration: [number, string];
    from_gate: number;
    to_gate: number;
}
export default Flight