package challenges;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class TestChallenge {

    @Test
    public void testHelloWorld() {
        assertEquals("hello world", Attempt.getHelloWorld());
    }

    @Test
    public void testNumber10() {
        assertEquals(10, Attempt.getNumber10());
    }

}
