namespace TicTacToe.Models
{
    public interface IBoardSetup
    {
        public void set(string location);
        public void update();

        public string get();
    }
}

